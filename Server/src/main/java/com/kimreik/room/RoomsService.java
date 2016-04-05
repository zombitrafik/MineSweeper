package com.kimreik.room;

import com.kimreik.game.Game;
import com.kimreik.game.MineField;
import com.kimreik.game.Player;
import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.services.SocketMessagingService;
import com.kimreik.statistics.StatisticsService;
import com.kimreik.user.User;
import com.kimreik.user.UsersRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.Optional;
import java.util.stream.Collectors;

//TODO refactor by getCurrentRoom()

@Service
public class RoomsService
{

	Logger							logger	= Logger.getLogger(RoomsService.class);

	@Autowired
	RoomsRepository					roomRepo;

	@Autowired
	UsersRepository					userRepo;

	@Autowired
	StatisticsService				statService;

	@Autowired
	private SocketMessagingService	socketMessagingService;

	public ResponseEntity<?> createRoom(String username, RoomDTO roomDTO, BindingResult result)
	{

		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() != 0)
		{
			return ResponseWrapper.wrap(ResponseMessage.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}

		Room newRoom = new Room();
		BeanUtils.copyProperties(roomDTO, newRoom);
		Game newGame = new Game();
		MineField mineField = new MineField();
		BeanUtils.copyProperties(roomDTO, mineField);
		newGame.setMineField(mineField);
		newRoom.setGame(newGame);

		Player newPlayer = new Player();
		BeanUtils.copyProperties(user, newPlayer);
		newPlayer.setLeader(true);
		newRoom.getPlayers().add(newPlayer);

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
		//room.isStarted();
		return ResponseWrapper.wrap(roomRepo.findAll().stream().filter(room -> !room.isFinished()).collect(Collectors.toList()), HttpStatus.OK);
	}

	public ResponseEntity<?> joinRoom(Integer id, String username)
	{
		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() != 0 && user.getCurrentRoomid() != id)
		{
			return ResponseWrapper.wrap(ResponseMessage.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}

		Room joinedRoom = roomRepo.findOne(id);

		if (joinedRoom == null)
		{
			//TODO responseMessage
			return null;
		}

		Optional<Player> optional = joinedRoom.getPlayers().stream().filter(player -> player.getUsername().equals(username)).findFirst();
		if (optional.isPresent())
		{
			Player leavedPlayer = optional.get();
			leavedPlayer.setLeaved(false);
		}
		else
		{
			Player newPlayer = new Player();
			BeanUtils.copyProperties(user, newPlayer);
			joinedRoom.getPlayers().add(newPlayer);
		}
		user.setCurrentRoomid(joinedRoom.getId());

		ResponseMessage message = ResponseMessage.PLAYER_JOINED;
		message.add("username", user.getUsername());
		message.add("rating", user.getRating());
		socketMessagingService.sendToRoom(joinedRoom.getId(), message);

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
			return;
		}
		Room leavedRoom = roomRepo.findOne(user.getCurrentRoomid());

		Player player = leavedRoom.getPlayers().stream().filter(player1 -> player1.getUsername().equals(username)).findFirst().get();
		player.setLeaved(true);
		if (player.isLeader())
		{
			Optional<Player> optional = leavedRoom.getPlayers().stream().filter(player1 -> !player1.isLeader() && !player1.isLeaved()).findFirst();
			if (optional.isPresent())
			{
				Player newLeader = optional.get();
				newLeader.setLeader(true);

				ResponseMessage responseMessage = ResponseMessage.LEADER_CHANGED;
				responseMessage.add("newLeader", newLeader.getUsername());
			}
			player.setLeader(false);
		}

		user.setCurrentRoomid(0);

		leavedRoom = roomRepo.save(leavedRoom);

		boolean isRoomEmpty = leavedRoom.getPlayers().stream().filter(player1 -> !player1.isLeaved()).count() == 0;

		if (isRoomEmpty)
		{
			if (!leavedRoom.isFinished() && leavedRoom.isStarted())
			{
				statService.appendGameToStat(leavedRoom);
			}
			roomRepo.delete(leavedRoom);
		}

		ResponseMessage message = ResponseMessage.PLAYER_LEAVED;
		message.add("username", player.getUsername());

		socketMessagingService.sendToRoom(leavedRoom.getId(), message);

	}

	public Room getCurrentRoom(String username)
	{
		User user = userRepo.findOne(username);
		if (user == null) return null;
		return roomRepo.findOne(user.getCurrentRoomid());
	}

	public int nextRoom(String username)
	{
		Room room = getCurrentRoom(username);
		if (room == null || !room.isFinished()) return 0;
		if (room.getNextRoomId() != 0) return room.getNextRoomId();

		Room newRoom = new Room();
		BeanUtils.copyProperties(room, newRoom);
		newRoom.setId(null);
		return roomRepo.save(newRoom).getId();
	}

	public void sendMessage(String username, String message)
	{
		Room room = getCurrentRoom(username);
		if (room == null) return;

		ResponseMessage responseMessage = ResponseMessage.ROOM_MESSAGE;
		responseMessage.add("sender", username);
		responseMessage.add("message", message);
		socketMessagingService.sendToRoom(room.getId(), responseMessage);
	}

	public void startGame(String username)
	{
		Room room = getCurrentRoom(username);
		if (room == null || room.isStarted()) return;

		if (room.getPlayers().stream().filter(player -> player.isLeader() && player.getUsername().equals(username)).count() != 0)
		{
			ResponseMessage responseMessage = ResponseMessage.GAME_STARTED;
			socketMessagingService.sendToRoom(room.getId(), responseMessage);
		}
		room.setStarted(true);
		roomRepo.save(room);
	}

	public void invitePlayer(String username, String invitedPlayerName)
	{
		Room room = getCurrentRoom(username);
		if (room == null) return;

		User invitedUser = userRepo.findOne(invitedPlayerName);

		if (invitedUser == null) return;

		ResponseMessage message = ResponseMessage.INVITE;
		message.add("username", username);
		message.add("roomId", room.getId());
		message.add("roomName", room.getName());
		message.add("roomHeight", room.getGame().getMineField().getWidth());
		message.add("roomWidth", room.getGame().getMineField().getHeight());
		message.add("roomBombs", room.getGame().getMineField().getMinesCount());

		socketMessagingService.sendInviteToUser(invitedPlayerName, message);
	}
}
