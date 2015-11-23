package com.kimreik.controllers;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
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
	
	//@MessageMapping("/find")
	@RequestMapping(value="/find", method = RequestMethod.GET)
	public ResponseEntity<?> findUser(@RequestParam String username){
		return usersService.find(username);
	}
	
	@MessageMapping("/sendMessage")
	public void sendMessage(Principal principal, String username, String message){
		Logger.getLogger(UsersController.class).error("sendmessage controller");
		usersService.sendMessage(principal.getName(), username, message);
	}	
	
}
