package com.kimreik.controllers;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kimreik.user.User;
import com.kimreik.user.UsersService;

@RestController
public class AuthController {
	
	@Autowired
	private UsersService userService;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public User loginUser(Principal user) {
		Logger.getLogger(AuthController.class).error("login");
		
		return userService.login(user);
	}

	@RequestMapping(value = "/newUser", method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@RequestBody User user, BindingResult result) {
		
		return userService.addUser(user, result);
	}

}
