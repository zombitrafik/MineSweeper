package com.kimreik.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.kimreik.model.GameRoom;
import com.kimreik.model.MineField;
import com.kimreik.model.Point;

@Service
public class GameServiceImpl implements GameService{

	private List<GameRoom> gameRooms = new ArrayList<GameRoom>();
	private int id;
	
	public GameRoom createRoom(String name) {
		GameRoom newRoom = new GameRoom();
		newRoom.setName(name+"'s game");
		newRoom.setId(++id);
		newRoom.addPlayer(name);
		newRoom.setMineField(new MineField(10,10,10));
		gameRooms.add(newRoom);
		return newRoom;
	}

	public List<GameRoom> getRooms() {
		List<GameRoom> rooms = new ArrayList<GameRoom>(gameRooms);
		for(GameRoom room: rooms){
			room.setPlayers(null);
			room.setMineField(null);
		}
		return rooms;
	}

	public GameRoom joinRoom(Integer id, String playerName) {
		GameRoom joinedRoom = getRoomById(id);
		joinedRoom.addPlayer(playerName);
		return joinedRoom;
	}

	private GameRoom getRoomById(Integer id){
		for(GameRoom room : gameRooms){
			if(room.getId()==id) return room;
		}
		return null;
	}
	
	public Set<Point> handleGameClick(Point point, Integer id){
		return getRoomById(id).getMineField().handleClick(point);
	}

}
