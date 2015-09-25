package com.kimreik.services;

import java.util.List;

import com.kimreik.model.ChatRoom;

public interface ChatService {
	public List<ChatRoom> getRooms();
	public void createRoom(String name);
}
