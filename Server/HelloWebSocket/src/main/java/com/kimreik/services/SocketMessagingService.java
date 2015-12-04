package com.kimreik.services;

import com.kimreik.helpers.ResponseMessage;

public interface SocketMessagingService {
	public void sendToRoom(int roomId, ResponseMessage message);
	public void sendHeartbeat();
	
	public void sendPrivateMessage(String recipient, ResponseMessage message);
	public void sendGameEventToUser(String username, ResponseMessage message);
}
