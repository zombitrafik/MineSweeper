package com.kimreik.services;

import org.springframework.http.ResponseEntity;

public interface FriendsService
{
	ResponseEntity<?> addFriend(String username, String friendName);

	ResponseEntity<?> removeFriend(String username, String friendName);

	ResponseEntity<?> getFriends(String username);
}
