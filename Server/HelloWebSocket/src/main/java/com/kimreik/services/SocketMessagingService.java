package com.kimreik.services;

import com.kimreik.helpers.ResponseMessage;

public interface SocketMessagingService
{
	void sendToRoom(int roomId, ResponseMessage message);

	void sendHeartbeat();

	void sendPrivateMessage(String recipient, ResponseMessage message);

	void sendGameEventToUser(String username, ResponseMessage message);
}
