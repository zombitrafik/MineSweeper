package com.kimreik.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimreik.model.GameRoom;
import com.kimreik.repositories.ChatRoomRepository;

@Service("dataBase")
public class ChatServiceDBImpl implements ChatService {

	@Autowired
	ChatRoomRepository roomRepo;
	
	public List<GameRoom> getRooms() {
		return roomRepo.findAll();
	}

	public void createRoom(String name) {
		GameRoom room =  new GameRoom();
		room.setName(name+"'s room");
		room.setId(null);
		roomRepo.saveAndFlush(room);
	}

}
