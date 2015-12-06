package com.kimreik.user;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.dialog.PrivateMessage;
import com.kimreik.services.ChatService;

@RestController
@RequestMapping("/users")
public class UsersController {

	@Autowired
	UsersService usersService;
	
	@Autowired
	ChatService chatService;
	
	//@MessageMapping("/find")
	@RequestMapping(value="/find", method = RequestMethod.GET)
	public ResponseEntity<?> findUser(Principal principal, @RequestParam(value="username") String username){
		return usersService.find(principal.getName(), username);
	}
	
	@MessageMapping("/sendMessage")
	public void sendMessage(Principal principal, PrivateMessage message){
		chatService.sendMessage(principal.getName(),message);
	}	
	
	@MessageMapping("/heartbeat")
	public void heartbeat(Principal principal){
		usersService.heartbeat(principal.getName());
	}
	
	@RequestMapping(value="/dialogs", method = RequestMethod.GET)
	public ResponseEntity<?> getDialogs(Principal principal){
		return chatService.getDialogs(principal.getName());
	}
	
	@RequestMapping(value="/dialogs/{username}", method = RequestMethod.GET)
	public ResponseEntity<?> getDialog(Principal principal, @PathVariable String username){
		return chatService.getDialog(principal.getName(), username);
	}
	
}
