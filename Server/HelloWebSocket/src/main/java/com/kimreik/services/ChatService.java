package com.kimreik.services;

import com.kimreik.dialog.PrivateMessage;
import org.springframework.http.ResponseEntity;

public interface ChatService
{
	void sendMessage(String sender, PrivateMessage message);

	ResponseEntity<?> getDialogs(String username);

	ResponseEntity<?> getDialog(String user1, String user2);
}
