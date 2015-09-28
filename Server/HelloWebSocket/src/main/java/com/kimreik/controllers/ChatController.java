package com.kimreik.controllers;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.kimreik.model.ChatRoom;
import com.kimreik.model.Message;
import com.kimreik.services.ChatService;

@Controller("/test")
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	Logger logger = Logger.getLogger(ChatController.class);
	
	@Autowired
	ChatService service;
	
	@MessageMapping("/sendMessage/{id}")
	public void handleMessage(Message message, Principal principal, @DestinationVariable String id){
		message.setDate(new Date());
		message.setSenderName(principal.getName());
		simpMessagingTemplate.convertAndSend("/broker/rooms/"+id, message);
	}	
	
	@MessageMapping("/createRoom")
	@SendTo("/broker/rooms")
	public List<ChatRoom> createRoom(Principal principal){
		service.createRoom(principal.getName());
		return service.getRooms();
	}
	
	@MessageMapping("/connect")
	public void connectUser(Principal principal){
		logger.error("connect");
		String user = principal.getName();
		simpMessagingTemplate.convertAndSendToUser(user, "/connect", service.getRooms());
	}
	
}
