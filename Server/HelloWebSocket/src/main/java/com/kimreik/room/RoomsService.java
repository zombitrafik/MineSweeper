package com.kimreik.room;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface RoomsService
{
	ResponseEntity<?> createRoom(String username, RoomDTO roomDTO, BindingResult result);

	ResponseEntity<?> getRooms();

	ResponseEntity<?> joinRoom(Integer id, String username);

	Room getCurrentRoom(String username);

	void leaveRoom(String username);

	int nextRoom(String username);

	void/*Principal*/disconnect(String username);
}
