package com.kimreik.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.model.GameRoom;
import com.kimreik.services.GameService;

@RestController
@RequestMapping("/lobby")
public class LobbyController {

	@Autowired
	GameService roomService;
	
	@RequestMapping(value="/createRoom", method = RequestMethod.POST)
	public void createRoom(Principal principal){
		roomService.createRoom(principal.getName());
	}
	
	@RequestMapping(value="/getRooms", method = RequestMethod.GET)
	public List<GameRoom> getRooms(){
		return roomService.getRooms();
	}	
}
