package com.kimreik.controllers;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.kimreik.model.Point;
import com.kimreik.room.RoomsService;
import com.kimreik.services.GameService;

@Controller("/test")
public class GameController {

	Logger logger = Logger.getLogger(GameController.class);
	
	@Autowired
	GameService gameService;
	
	@Autowired
	RoomsService roomsService;
		
	@MessageMapping("/right")
	public void handleRightClick(Principal principal, Point point){
		gameService.handleGameRightClick(principal.getName(), point);
	}
	
	@MessageMapping("/left")
	public void handleClick(Principal principal, Point point){
		gameService.handleGameClick(principal.getName(), point);
	}	
	
	
	/*
	//эта функция будет нужна не для отправки присоединившемуся, а для остальных в комнате.
	@MessageMapping("/connect")
	public void connectUser(Principal principal){
		logger.error("connect");
		String user = principal.getName();
		//simpMessagingTemplate.convertAndSendToUser(user, "/broker/connect", service.getRooms());
	}*/
	
}
