package com.kimreik.services;

import com.kimreik.helpers.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class SocketMessagingService
{

	private final String			HEARTBEAT_PREFIX		= "/broker/heartBeat";
	private final String			ROOM_PREFIX				= "/broker/rooms/";

	private final String			GAME_EVENT_PREFIX		= "/broker/game-events";
	private final String			PRIVATE_MESSAGE_PREFIX	= "/broker/messages";
	private final String			INVITE_PREFIX			= "/broker/invites";

	@Autowired
	private SimpMessagingTemplate	simpMessagingTemplate;

	public void sendGameEventToUser(String username, ResponseMessage message)
	{
		simpMessagingTemplate.convertAndSendToUser(username, GAME_EVENT_PREFIX, message);
	}

	public void sendPrivateMessage(String recipient, ResponseMessage message)
	{
		simpMessagingTemplate.convertAndSendToUser(recipient, PRIVATE_MESSAGE_PREFIX, message);
	}

	public void sendInviteToUser(String username, ResponseMessage message)
	{
		simpMessagingTemplate.convertAndSendToUser(username, INVITE_PREFIX, message);
	}

	public void sendToRoom(int roomId, ResponseMessage message)
	{
		sendToSubscribers(ROOM_PREFIX + roomId, message);
	}

	public void sendHeartbeat()
	{
		sendToSubscribers(HEARTBEAT_PREFIX, ResponseMessage.HEARTBEAT);
	}

	private void sendToSubscribers(String subscribePrefix, ResponseMessage message)
	{
		simpMessagingTemplate.convertAndSend(subscribePrefix, message);
	}

}
