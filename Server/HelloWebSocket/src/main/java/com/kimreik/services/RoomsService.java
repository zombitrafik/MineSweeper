package com.kimreik.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.kimreik.model.GameRoom;
import com.kimreik.model.MineField;

public interface RoomsService {
	public ResponseEntity<?> createRoom(String username, MineField mineField);
	public List<GameRoom> getRooms();
	public ResponseEntity<?> joinRoom(Integer id, String username);
	public GameRoom getCurrentRoom(String username);
	public void leaveRoom(String username);
	public void/*Principal*/ disconnect(String username);
}
