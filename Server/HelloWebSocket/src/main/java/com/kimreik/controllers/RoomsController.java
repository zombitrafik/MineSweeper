package com.kimreik.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.model.GameRoom;
import com.kimreik.model.MineField;
import com.kimreik.model.Point;
import com.kimreik.services.GameService;
import com.kimreik.services.RoomsService;

@RestController
@RequestMapping("/rooms")
public class RoomsController {

	@Autowired
	RoomsService roomsService;
	
	@Autowired
	GameService gameService;
	
	@RequestMapping(value="/create", method = RequestMethod.POST)
	public ResponseEntity<?> createRoom(Principal principal, @RequestBody MineField mineField){
		return roomsService.createRoom(principal.getName(), mineField);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<GameRoom> getRooms(){
		return roomsService.getRooms();
	}	
	
	@RequestMapping(value="/current", method = RequestMethod.GET)
	public GameRoom getCurrentRoom(Principal principal){
		return roomsService.getCurrentRoom(principal.getName());
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.POST)
	public ResponseEntity<?> joinRoom(Principal principal, @PathVariable Integer id){
		return roomsService.joinRoom(id, principal.getName());
	}
	@RequestMapping(value="/testClick", method = RequestMethod.POST)
	public ResponseEntity<?> handleClick(Principal principal,@RequestBody  Point point){
		return gameService.handleGameClick(principal.getName(), point);
	}
	
	@RequestMapping(value="/testRightClick", method = RequestMethod.POST)
	public ResponseEntity<?> handleRightClick(Principal principal,@RequestBody  Point point){
		return gameService.handleGameRightClick(principal.getName(), point);
	}
	
	@RequestMapping(value="/leave", method = RequestMethod.POST)
	public void leaveRoom(Principal principal){
		roomsService.leaveRoom(principal.getName());
	}
	
	
}
