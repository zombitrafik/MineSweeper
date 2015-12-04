package com.kimreik.room;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.model.Game;
import com.kimreik.model.MineField;
import com.kimreik.repositories.GameRoomRepository;
import com.kimreik.repositories.UsersRepository;
import com.kimreik.user.User;

@Service
public class RoomsServiceImpl implements RoomsService {


	Logger logger = Logger.getLogger(RoomsServiceImpl.class);
	
	@Autowired
	GameRoomRepository roomRepo;

	@Autowired
	UsersRepository userRepo;

	
	public ResponseEntity<?> createRoom(String username, RoomDTO roomDTO) {

		
		User user = userRepo.findOne(username);

		if(user.getCurrentRoomid()!=0){
			return ResponseWrapper.wrap(ResponseMessage.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		Room newRoom = new Room(roomDTO);
		newRoom.setId(null);
		newRoom.addPlayer(user.getUsername());
		
		newRoom = roomRepo.save(newRoom);
		user.setCurrentRoomid(newRoom.getId());
		userRepo.save(user);
		
		return ResponseWrapper.wrap(newRoom,HttpStatus.OK);
	}

	public ResponseEntity<?> getRooms() {
		List<RoomDTO> rooms = new ArrayList<RoomDTO>();

		for (Room room : roomRepo.findAll()) {
			if(!room.isStarted()) 
				rooms.add(new RoomDTO(room));
		}
		return ResponseWrapper.wrap(rooms, HttpStatus.OK);
	}

	public ResponseEntity<?> joinRoom(Integer id, String username) {
		User user = userRepo.findOne(username);
		
		if(user.getCurrentRoomid()!=0 && user.getCurrentRoomid()!=id){
			return ResponseWrapper.wrap(ResponseMessage.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		Room joinedRoom = roomRepo.findOne(id);

		if(user.getCurrentRoomid()!=id){
			joinedRoom.addPlayer(username);
			user.setCurrentRoomid(joinedRoom.getId());
			userRepo.save(user);
		}

		return ResponseWrapper.wrap(roomRepo.save(joinedRoom), HttpStatus.OK);
	}

	public void/* Principal */ disconnect(String username) {
		// сообщать остальным что чел афк
	}

	public void leaveRoom(String username) {
		
		User user = userRepo.findOne(username);
		if(user==null || user.getCurrentRoomid()==0){
			return;//мб какой-то ответ отсылать
		}
		Room leavedRoom = roomRepo.findOne(user.getCurrentRoomid());
		
		
		leavedRoom.removePlayer(username);
		
		user.setCurrentRoomid(0);
		
		leavedRoom = roomRepo.save(leavedRoom);
		
		if (leavedRoom.getPlayers().size() == 0) {
			roomRepo.delete(leavedRoom);
		}
		
		
	}

	public Room getCurrentRoom(String username) {
		User user = userRepo.findOne(username);
		return roomRepo.findOne(user.getCurrentRoomid());
		
	}

}
