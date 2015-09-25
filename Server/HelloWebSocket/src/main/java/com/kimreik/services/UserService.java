package com.kimreik.services;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import com.kimreik.model.User;

public interface UserService {
	public ResponseEntity<?> addUser(User user, BindingResult result);

}
