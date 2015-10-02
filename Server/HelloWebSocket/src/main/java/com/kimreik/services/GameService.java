package com.kimreik.services;

import java.util.List;

import com.kimreik.model.GameRoom;

public interface GameService {
	public void createRoom(String name);
	public List<GameRoom> getRooms();
}
