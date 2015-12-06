package com.kimreik.services;

import org.springframework.http.ResponseEntity;

import com.kimreik.dialog.PrivateMessage;

public interface ChatService {
	public void sendMessage(String sender, PrivateMessage message);
	public ResponseEntity<?> getDialogs(String username);
	public ResponseEntity<?> getDialog(String user1, String user2);
 }
