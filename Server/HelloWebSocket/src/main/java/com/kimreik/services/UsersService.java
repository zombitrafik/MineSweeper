package com.kimreik.services;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import com.kimreik.model.PrivateMessage;
import com.kimreik.model.User;

public interface UsersService {
	public ResponseEntity<?> addUser(User user, BindingResult result);
	public User login(Principal user);
	public ResponseEntity<?> find(String finder, String username);
	public ResponseEntity<?> addFriend(String username, String friendName);
	public ResponseEntity<?> removeFriend(String username, String friendName);
	public void sendMessage(String sender, PrivateMessage message);
	public ResponseEntity<?> getFriends(String username);
	public void heartbeat(String username);
}
