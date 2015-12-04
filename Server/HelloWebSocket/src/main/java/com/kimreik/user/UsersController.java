package com.kimreik.user;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.model.PrivateMessage;

@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	//@MessageMapping("/find")
	@RequestMapping(value="/find", method = RequestMethod.GET)
	public ResponseEntity<?> findUser(Principal principal, @RequestParam(value="username") String username){
		return usersService.find(principal.getName(), username);
	}
	
	@MessageMapping("/sendMessage")
	public void sendMessage(Principal principal, PrivateMessage message){
		usersService.sendMessage(principal.getName(),message);
	}	
	
	@MessageMapping("/heartbeat")
	public void heartbeat(Principal principal){
		usersService.heartbeat(principal.getName());;
	}
	
}
