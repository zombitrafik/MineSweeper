package com.kimreik.services;

import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.user.User;
import com.kimreik.user.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsService
{

	@Autowired
	private UsersRepository	usersRepo;

	public ResponseEntity<?> addFriend(String username, String friendName)
	{
		User user = usersRepo.findOne(username);
		User friend = usersRepo.findOne(friendName);
		ResponseMessage message;

		if (friend != null)
		{
			user.addFriend(friendName);
			usersRepo.save(user);
			message = ResponseMessage.FRIEND_ADDED_SUCCESSFULLY;
			return ResponseWrapper.wrap(message, HttpStatus.OK);
		}
		else
		{
			message = ResponseMessage.FRIEND_ADDING_ERROR.add("error", "USER '" + friendName + "' NOT FOUND");
			return ResponseWrapper.wrap(message, HttpStatus.NOT_FOUND);
		}
		//TODO �����-�� ����������� � FRIEND_ADDING_ERROR
	}

	public ResponseEntity<?> removeFriend(String username, String friendName)
	{
		User user = usersRepo.findOne(username);

		user.removeFriend(friendName);

		usersRepo.save(user);

		return ResponseWrapper.wrap(ResponseMessage.FRIEND_REMOVED_SUCCESSFULLY, HttpStatus.OK);
	}

	public ResponseEntity<?> getFriends(String username)
	{

		List<String> friendNames = usersRepo.findOne(username).getFriends();
		List<User> friends = usersRepo.findAll(friendNames);

		ResponseMessage message = ResponseMessage.FRIENDS.add("friends", friends);
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

}
