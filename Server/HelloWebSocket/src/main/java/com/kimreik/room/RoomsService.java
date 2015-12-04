package com.kimreik.room;

import org.springframework.http.ResponseEntity;

public interface RoomsService {
	public ResponseEntity<?> createRoom(String username, RoomDTO roomDTO);
	public ResponseEntity<?> getRooms();
	public ResponseEntity<?> joinRoom(Integer id, String username);
	public Room getCurrentRoom(String username);
	public void leaveRoom(String username);
	public void/*Principal*/ disconnect(String username);
}
