package com.kimreik.controllers;

import com.kimreik.services.FriendsService;
import com.kimreik.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/friends")
public class FriendsController
{

	@Autowired
	private FriendsService	friendsService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getFriends(Principal principal)
	{
		return friendsService.getFriends(principal.getName());
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity<?> addFriend(Principal principal, @RequestBody UserDTO userDTO)
	{
		return friendsService.addFriend(principal.getName(), userDTO.getUsername());
	}

	@RequestMapping(value = "/remove", method = RequestMethod.POST)
	public ResponseEntity<?> removeFriend(Principal principal, @RequestBody UserDTO userDTO)
	{
		return friendsService.removeFriend(principal.getName(), userDTO.getUsername());
	}

}
