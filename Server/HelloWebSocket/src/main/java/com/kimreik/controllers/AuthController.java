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

import com.kimreik.model.User;
import com.kimreik.services.UserService;
import com.kimreik.validators.UserValidator;

@RestController
public class AuthController {
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public User loginUser(Principal user) {
		return userService.login(user);
	}

	@RequestMapping(value = "/newUser", method = RequestMethod.POST)
	public ResponseEntity<?> registerUser(@RequestBody User user, BindingResult result) {
		Logger.getLogger(AuthController.class).error(user.getUsername()+" "+user.getMatchingPassword());
		
		return userService.addUser(user, result);
	}

}
