package com.kimreik.controllers;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.kimreik.model.Point;
import com.kimreik.services.GameService;

@Controller("/game")
public class GameController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	Logger logger = Logger.getLogger(GameController.class);
	
	@Autowired
	GameService gameService;
	
	@MessageMapping("/{id}")
	public void handleClick(Point point, Principal principal, @DestinationVariable Integer id){ //id был String
		
		simpMessagingTemplate.convertAndSend("/broker/rooms/"+id, gameService.handleGameClick(point, id));
	}	
	
	
	@MessageMapping("/connect")
	public void connectUser(Principal principal){
		logger.error("connect");
		String user = principal.getName();
		//simpMessagingTemplate.convertAndSendToUser(user, "/broker/connect", service.getRooms());
	}
	
}
