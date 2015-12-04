package com.kimreik.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.kimreik.helpers.ResponseMessage;

@Service
public class SocketMessagingServiceImpl implements SocketMessagingService {

	private final String HEARTBEAT_PREFIX = "/broker/heartBeat";
	private final String ROOM_PREFIX = "/broker/rooms/";
	
	private final String GAME_EVENT_PREFIX = "/broker/game-events";
	private final String PRIVATE_MESSAGE_PREFIX = "/broker/messages";
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	public void sendGameEventToUser(String username, ResponseMessage message) {
		simpMessagingTemplate.convertAndSendToUser(username, GAME_EVENT_PREFIX, message);
	}
	
	public void sendPrivateMessage(String recipient, ResponseMessage message){
		simpMessagingTemplate.convertAndSendToUser(recipient, PRIVATE_MESSAGE_PREFIX, message);
	}
	
	public void sendToRoom(int roomId, ResponseMessage message) {
		sendToSubscribers(ROOM_PREFIX+roomId, message);
	}

	public void sendHeartbeat() {
		sendToSubscribers(HEARTBEAT_PREFIX, ResponseMessage.HEARTBEAT);
	}
	
	
	private void sendToSubscribers(String subscribePrefix, ResponseMessage message) {
		simpMessagingTemplate.convertAndSend(subscribePrefix, message);
	}

}