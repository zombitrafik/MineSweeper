package com.kimreik.services;

import java.util.List;
import java.util.Set;

import com.kimreik.model.GameRoom;
import com.kimreik.model.Point;

public interface GameService {
	public GameRoom createRoom(String name);
	public List<GameRoom> getRooms();
	public GameRoom joinRoom(Integer id, String playerName);
	public Set<Point> handleGameClick(Point point, Integer id);
}
