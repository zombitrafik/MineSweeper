package com.kimreik.services;

import com.kimreik.helpers.ResponseMessage;

public interface SocketMessagingService {
	public void sendGameEventToUser(String username, ResponseMessage message);
	public void sendToRoom(int roomId, ResponseMessage message);
	public void sendHeartbeat();
}
