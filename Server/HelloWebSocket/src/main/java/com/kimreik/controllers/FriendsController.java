package com.kimreik.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.user.UserDTO;
import com.kimreik.user.UsersService;

@RestController
@RequestMapping("/friends")
public class FriendsController {

	@Autowired
	UsersService usersService;
		
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getFriends(Principal principal){
		return usersService.getFriends(principal.getName());
	}
	
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public ResponseEntity<?> addFriend(Principal principal, @RequestBody UserDTO userDTO){
		return usersService.addFriend(principal.getName(), userDTO.getUsername());
	}
	
	@RequestMapping(value="/remove", method=RequestMethod.POST)
	public ResponseEntity<?> removeFriend(Principal principal, @RequestBody UserDTO userDTO){
		return usersService.removeFriend(principal.getName(), userDTO.getUsername());
	}
	
	
}
