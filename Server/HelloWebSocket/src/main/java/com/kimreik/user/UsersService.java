package com.kimreik.user;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface UsersService {
	public ResponseEntity<?> addUser(User user, BindingResult result);
	public User login(Principal user);
	public ResponseEntity<?> find(String finder, String username);
	
	public void heartbeat(String username);
}
