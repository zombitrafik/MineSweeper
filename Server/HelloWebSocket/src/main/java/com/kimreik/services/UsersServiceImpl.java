package com.kimreik.services;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.model.PrivateMessage;
import com.kimreik.model.User;
import com.kimreik.repositories.UsersRepository;
import com.kimreik.validators.UserValidator;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersRepository usersRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
	
	public ResponseEntity<?> addUser(User user, BindingResult result) {
		user.setEnabled(true);
		
		user.setUsername(user.getUsername().toLowerCase());
		
		UserValidator validator = new UserValidator(usersRepo);

		validator.validate(user, result);
		if (result.hasErrors()) {
			String errStr = "";
			for (ObjectError err : result.getAllErrors()) {
				errStr += err.getCode();
			}
			return new ResponseEntity<ResponseMessage>(ResponseMessage.error(errStr), HttpStatus.BAD_REQUEST);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("ROLE_USER");
		usersRepo.saveAndFlush(user);
		return null;
	}

	public User login(Principal principal) {
		return usersRepo.findOne(principal.getName());
	}

	public ResponseEntity<?> find(String username) {
		ResponseMessage message = ResponseMessage.FIND_USER_RESULT
				.add("userList", usersRepo.find(username));
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

	public ResponseEntity<?> addFriend(String username, String friendName) {
		User user = usersRepo.findOne(username);
		User friend = usersRepo.findOne(friendName);
		ResponseMessage message;
		
		if(friend!=null){
			user.addFriend(friendName);
			usersRepo.save(user);
			message = ResponseMessage.FRIEND_ADDED_SUCCESFULLY;
		}else{
			message = ResponseMessage.FRIEND_ADDING_ERROR
					.add("error", "USER '"+friendName+"' NOT FOUND");
		}
		//TODO какие-то ограничения и FRIEND_ADDING_ERROR
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

	public ResponseEntity<?> removeFriend(String username, String friendName) {
		User user = usersRepo.findOne(username);
		user.removeFriend(friendName);
		
		usersRepo.save(user);
		
		return ResponseWrapper.wrap(ResponseMessage.FRIEND_REMOVED_SUCCESFULLY, HttpStatus.OK);
	}

	public void sendMessage(PrivateMessage message) {
		
		Logger.getLogger(UsersServiceImpl.class).error("sendMessage "+message.getMessage()+" from "+message.getSender());

		//TODO: егор если юзер офлайн или игнорит или типа того.
		boolean recipientOnline = true; //TODO заглушка
		
		if(recipientOnline){
			ResponseMessage respMessage = ResponseMessage.PRIVATE_MESSAGE
					.add("message", message);
			simpMessagingTemplate.convertAndSendToUser(message.getRecipient(), "/messages", respMessage);
			simpMessagingTemplate.convertAndSendToUser(message.getSender(), "/messages", respMessage);
		}else{
			//send error to sender
		}
		
	}

	public ResponseEntity<?> getFriends(String username) {
		ResponseMessage message = ResponseMessage.FRIENDS
				.add("friends", usersRepo.findOne(username).getFriends());
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

}

