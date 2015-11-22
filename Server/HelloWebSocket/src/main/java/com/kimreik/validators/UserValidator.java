package com.kimreik.validators;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.kimreik.helpers.ResponseMessage;
import com.kimreik.model.User;
import com.kimreik.repositories.UserRepository;

public class UserValidator  implements Validator{
	
	private UserRepository repo;
	
	public UserValidator(UserRepository repo){
		this.repo = repo;
	}
	
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	public void validate(Object target, Errors error) {
		User user = (User) target;
		if(repo.findOne(user.getUsername())!=null){
			error.rejectValue("username", ResponseMessage.USERNAME_ALREADY_EXIST.getError());
			return;
		}
		if(!user.getPassword().equals(user.getMatchingPassword())){
			error.rejectValue("password", ResponseMessage.PASSWORDS_DONT_MATCH.getError());
		}
	}

}
