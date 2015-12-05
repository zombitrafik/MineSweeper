package com.kimreik.room;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface RoomsService {
	public ResponseEntity<?> createRoom(String username, RoomDTO roomDTO, BindingResult result);
	public ResponseEntity<?> getRooms();
	public ResponseEntity<?> joinRoom(Integer id, String username);
	public Room getCurrentRoom(String username);
	public void leaveRoom(String username);
	public void/*Principal*/ disconnect(String username);
}
