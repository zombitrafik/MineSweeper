package com.kimreik.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kimreik.model.ChatRoom;
import com.kimreik.repositories.ChatRoomRepository;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	ChatRoomRepository roomRepo;
	
	public List<ChatRoom> getRooms() {
		return roomRepo.findAll();
	}

	public void createRoom(String name) {
		ChatRoom room =  new ChatRoom();
		room.setName(name+"'s room");
		room.setId(null);
		roomRepo.saveAndFlush(room);
	}

}
