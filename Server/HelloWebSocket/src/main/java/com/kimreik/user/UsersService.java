package com.kimreik.user;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.security.Principal;

public interface UsersService
{
	public ResponseEntity<?> addUser(User user, BindingResult result);

	public User login(Principal user);

	public ResponseEntity<?> find(String finder, String username);

	public void heartbeat(String username);
}
