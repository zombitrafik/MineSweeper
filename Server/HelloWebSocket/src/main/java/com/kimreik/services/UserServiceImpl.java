package com.kimreik.services;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import com.kimreik.model.User;
import com.kimreik.repositories.UserRepository;
import com.kimreik.validators.ErrorResponse;
import com.kimreik.validators.UserValidator;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public ResponseEntity<?> addUser(User user, BindingResult result) {
		user.setEnabled(true);

		UserValidator validator = new UserValidator(userRepo);

		validator.validate(user, result);
		if (result.hasErrors()) {
			String errStr = "";
			for (ObjectError err : result.getAllErrors()) {
				errStr += err.getCode();
			}
			return new ResponseEntity<ErrorResponse>(new ErrorResponse(errStr), HttpStatus.BAD_REQUEST);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("ROLE_USER");
		userRepo.saveAndFlush(user);
		return null;
	}

	public int login(Principal principal) {
		User user = userRepo.findOne(principal.getName());
		return user.getCurrentRoomid();
	}
}
