package com.kimreik.services;

import org.springframework.http.ResponseEntity;

public interface FriendsService {
	public ResponseEntity<?> addFriend(String username, String friendName);
	public ResponseEntity<?> removeFriend(String username, String friendName);
	public ResponseEntity<?> getFriends(String username);
}
