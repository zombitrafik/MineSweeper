package com.kimreik.services;

import java.util.List;

import com.kimreik.model.GameRoom;

public interface ChatService {
	public List<GameRoom> getRooms();
	public void createRoom(String name);
}
