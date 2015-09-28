package com.kimreik.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import com.kimreik.model.User;
import com.kimreik.model.UserRole;
import com.kimreik.repositories.UserRepository;
import com.kimreik.repositories.UserRoleRepository;
import com.kimreik.validators.ErrorResponse;
import com.kimreik.validators.UserValidator;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRoleRepository roleRepo;

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
		userRepo.saveAndFlush(user);
		UserRole role = new UserRole();
		role.setRole("ROLE_USER");
		role.setUsername(user.getUsername());
		roleRepo.saveAndFlush(role);
		return null;
	}
}
