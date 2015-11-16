package com.kimreik.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.model.Game;
import com.kimreik.model.GameRoom;
import com.kimreik.model.MineField;
import com.kimreik.model.User;
import com.kimreik.repositories.GameRoomRepository;
import com.kimreik.repositories.UserRepository;
import com.kimreik.validators.ErrorResponse;

@Service
public class RoomsServiceImpl implements RoomsService {


	Logger logger = Logger.getLogger(RoomsServiceImpl.class);
	
	@Autowired
	GameRoomRepository roomRepo;

	@Autowired
	UserRepository userRepo;

	
	public ResponseEntity<?> createRoom(String username, MineField mineField) {

		
		User user = userRepo.findOne(username);

		if(user.getCurrentRoomid()!=0){
			return ResponseWrapper.wrap(ErrorResponse.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		GameRoom newRoom = new GameRoom();
		newRoom.setName(user.getUsername() + "'s game");
		newRoom.setId(null);
		newRoom.addPlayer(user.getUsername());
		Game newGame = new Game();
		MineField newMineField = new MineField();
		newMineField.setHeight(mineField.getHeight());
		newMineField.setWidth(mineField.getWidth());
		newMineField.setMinesCount(mineField.getMinesCount());
		newGame.setMineField(newMineField);
		newRoom.setGame(newGame);

		newRoom = roomRepo.save(newRoom);
		user.setCurrentRoomid(newRoom.getId());
		userRepo.save(user);
		
		return ResponseWrapper.wrap(newRoom,HttpStatus.OK);
	}

	public List<GameRoom> getRooms() {
		List<GameRoom> rooms = new ArrayList<GameRoom>();

		for (GameRoom room : roomRepo.findAll()) {
			GameRoom newRoom = new GameRoom();
			newRoom.setId(room.getId());
			newRoom.setName(room.getName());
			rooms.add(newRoom);
		}
		return rooms;
	}

	public ResponseEntity<?> joinRoom(Integer id, String username) {
		User user = userRepo.findOne(username);
		
		if(user.getCurrentRoomid()!=0 && user.getCurrentRoomid()!=id){
			return ResponseWrapper.wrap(ErrorResponse.USER_ALREADY_IN_SOME_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		GameRoom joinedRoom = roomRepo.findOne(id);

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
		GameRoom leavedRoom = roomRepo.findOne(user.getCurrentRoomid());
		
		leavedRoom.removePlayer(username);
		
		user.setCurrentRoomid(0);
		
		leavedRoom = roomRepo.save(leavedRoom);
		
		if (leavedRoom.getPlayers().size() == 0) {
			roomRepo.delete(leavedRoom);
		}
		
		
	}

}
