package com.kimreik.room;

import com.kimreik.game.Player;
import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.statistics.StatisticsService;
import com.kimreik.user.User;
import com.kimreik.user.UsersRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomsServiceImpl implements RoomsService
{

	Logger				logger	= Logger.getLogger(RoomsServiceImpl.class);

	@Autowired
	RoomsRepository		roomRepo;

	@Autowired
	UsersRepository		userRepo;

	@Autowired
	StatisticsService	statService;

	public ResponseEntity<?> createRoom(String username, RoomDTO roomDTO, BindingResult result)
	{

		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() != 0)
		{
			return ResponseWrapper.wrap(ResponseMessage.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}

		Room newRoom = new Room(roomDTO);
		newRoom.setId(null);
		newRoom.addPlayer(user.getUsername());

		RoomValidator validator = new RoomValidator(roomRepo);

		validator.validate(newRoom, result);

		if (result.hasErrors())
		{
			String errStr = "";
			for (ObjectError err : result.getAllErrors())
			{
				errStr += err.getCode();
			}
			return new ResponseEntity<>(ResponseMessage.error(errStr), HttpStatus.BAD_REQUEST);
		}

		newRoom = roomRepo.save(newRoom);
		user.setCurrentRoomid(newRoom.getId());
		userRepo.save(user);

		return ResponseWrapper.wrap(newRoom, HttpStatus.OK);
	}

	public ResponseEntity<?> getRooms()
	{
		List<RoomDTO> rooms = roomRepo.findAll().stream().filter(room -> !room.isFinished()).map(RoomDTO::new).collect(Collectors.toList());

		//if(!room.isStarted())
		return ResponseWrapper.wrap(rooms, HttpStatus.OK);
	}

	public ResponseEntity<?> joinRoom(Integer id, String username)
	{
		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() != 0 && user.getCurrentRoomid() != id)
		{
			return ResponseWrapper.wrap(ResponseMessage.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}

		Room joinedRoom = roomRepo.findOne(id);

		if (joinedRoom.getPlayerByName(username) != null)
		{
			joinedRoom.setPlayerLeaved(username, false);
		}
		else
		{
			joinedRoom.addPlayer(username);
		}
		user.setCurrentRoomid(joinedRoom.getId());
		userRepo.save(user);

		return ResponseWrapper.wrap(roomRepo.save(joinedRoom), HttpStatus.OK);
	}

	public void/* Principal */disconnect(String username)
	{
		// �������� ��������� ��� ��� ���
	}

	public void leaveRoom(String username)
	{

		User user = userRepo.findOne(username);
		if (user == null || user.getCurrentRoomid() == 0)
		{
			return;//�� �����-�� ����� ��������
		}
		Room leavedRoom = roomRepo.findOne(user.getCurrentRoomid());

		leavedRoom.setPlayerLeaved(username, true);

		user.setCurrentRoomid(0);

		leavedRoom = roomRepo.save(leavedRoom);

		boolean isEmpty = true;

		for (Player pl : leavedRoom.getPlayers())
		{
			if (!pl.isLeaved())
			{
				isEmpty = false;
				break;
			}
		}

		if (isEmpty)
		{
			if (!leavedRoom.isFinished() && leavedRoom.isStarted())
			{
				statService.appendGameToStat(leavedRoom);
			}
			roomRepo.delete(leavedRoom);
		}

	}

	public Room getCurrentRoom(String username)
	{
		User user = userRepo.findOne(username);
		return roomRepo.findOne(user.getCurrentRoomid());

	}

	public int nextRoom(String username)
	{
		User user = userRepo.findOne(username);
		Room room = roomRepo.findOne(user.getCurrentRoomid());
		if (room == null || !room.isFinished()) return 0;
		if (room.getNextRoomId() != 0) return room.getNextRoomId();
		RoomDTO dto = new RoomDTO(room);
		logger.error("dto mines " + dto.getMinesCount());
		logger.error("room mines " + room.getGame().getMineField().getMinesCount());
		Room newRoom = new Room(new RoomDTO(room));
		newRoom.setId(null);
		return roomRepo.save(newRoom).getId();
	}

}
