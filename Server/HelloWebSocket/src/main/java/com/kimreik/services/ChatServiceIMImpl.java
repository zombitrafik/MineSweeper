package com.kimreik.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kimreik.model.GameRoom;

@Service("inMemory")
public class ChatServiceIMImpl implements ChatService {

	private List<GameRoom> roomList = new ArrayList<GameRoom>();
	
	public List<GameRoom> getRooms() {
		return roomList;
	}

	public void createRoom(String name) {
		GameRoom room =  new GameRoom();
		room.setName(name+"'s room");
		roomList.add(room);
	}

}
