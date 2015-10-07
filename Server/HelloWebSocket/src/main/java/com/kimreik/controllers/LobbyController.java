package com.kimreik.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.model.GameRoom;
import com.kimreik.model.Point;
import com.kimreik.services.GameService;

@RestController
@RequestMapping("/lobby")
public class LobbyController {

	@Autowired
	GameService gameService;
	
	@RequestMapping(value="/createRoom", method = RequestMethod.POST)
	public GameRoom createRoom(Principal principal){
		return gameService.createRoom(principal.getName());
	}
	
	@RequestMapping(value="/rooms", method = RequestMethod.GET)
	public List<GameRoom> getRooms(){
		return gameService.getRooms();
	}	
	
	@RequestMapping(value="/rooms/{id}", method = RequestMethod.POST)
	public GameRoom joinRoom(Principal principal, @PathVariable Integer id){
		return gameService.joinRoom(id, principal.getName());
	}
	@RequestMapping(value="/testClick/{id}", method = RequestMethod.POST)
	public Set<Point> handleClick(Principal principal,@RequestBody  Point point, @PathVariable Integer id){
		return gameService.handleGameClick(point, id);
	}
}
