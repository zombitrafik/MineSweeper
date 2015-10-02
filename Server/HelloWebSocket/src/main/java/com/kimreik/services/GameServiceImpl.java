package com.kimreik.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kimreik.model.GameRoom;

@Service
public class GameServiceImpl implements GameService{

	private List<GameRoom> gameRooms = new ArrayList<GameRoom>();
	private int id;
	
	public void createRoom(String name) {
		GameRoom newRoom = new GameRoom();
		newRoom.setName(name+"'s game");
		newRoom.setId(++id);
		gameRooms.add(newRoom);
	}

	public List<GameRoom> getRooms() {
		return gameRooms;
	}


}
