package com.kimreik.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.services.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	UsersService usersService;
		
	@RequestMapping(value="/find", method = RequestMethod.GET)
	public ResponseEntity<?> findUser(@RequestParam String username){
		return usersService.find(username);
	}
	
	@RequestMapping(value="/sendMessage", method = RequestMethod.POST)
	public ResponseEntity<?> sendMessage(Principal principal, @RequestParam String username, @RequestParam String message){
		return usersService.sendMessage(principal.getName(), username, message);
	}	
	
}
