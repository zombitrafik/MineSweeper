package com.kimreik.user;

import com.kimreik.game.Player;
import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.room.Room;
import com.kimreik.room.RoomsRepository;
import com.kimreik.room.RoomsService;
import com.kimreik.services.SocketMessagingService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.security.Principal;
import java.util.List;

@Service
public class UsersService
{

	@Autowired
	SocketMessagingService	socketMessagingService;

	@Autowired
	private UsersRepository	usersRepo;

	@Autowired
	private RoomsService	roomsService;

	@Autowired
	private RoomsRepository	roomsRepository;

	@Autowired
	private PasswordEncoder	passwordEncoder;

	public ResponseEntity<?> addUser(User user, BindingResult result)
	{
		user.setEnabled(true);

		user.setUsername(user.getUsername().toLowerCase());

		UserValidator validator = new UserValidator(usersRepo);

		validator.validate(user, result);
		if (result.hasErrors())
		{
			String errStr = "";
			for (ObjectError err : result.getAllErrors())
			{
				errStr += err.getCode();
			}
			return new ResponseEntity<>(ResponseMessage.error(errStr), HttpStatus.BAD_REQUEST);
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("ROLE_USER");
		usersRepo.saveAndFlush(user);
		return null;
	}

	public User login(Principal principal)
	{
		return usersRepo.findOne(principal.getName());
	}

	public ResponseEntity<?> find(String finder, String username)
	{
		List<User> result = usersRepo.findByName(username);
		User finderUser = usersRepo.findOne(finder);
		result.remove(finderUser);

		Room room = roomsService.getCurrentRoom(finder);

		if (room != null)
		{

			for (Player player : room.getPlayers())
			{
				User user = usersRepo.findOne(player.getUsername());
				result.remove(user);
			}
		}

		//result.remove(finderUser.getFriends());
		ResponseMessage message = ResponseMessage.FIND_USER_RESULT.add("userList", result);
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

	public void heartbeat(String username)
	{
		User user = usersRepo.findOne(username);
		user.setLastHeartBeat(System.currentTimeMillis());
		usersRepo.save(user);
	}

	public void updateStatus(String username, UserStatus status)
	{
		User user = usersRepo.findOne(username);
		user.setStatus(status);
		if (user.getCurrentRoomid() != 0)
		{
			Room room = roomsRepository.findOne(user.getCurrentRoomid());
			if (room != null && !room.isFinished())
			{
				ResponseMessage message = ResponseMessage.PLAYER_STATUS_UPDATE;
				message.add("name", username);
				message.add("status", status.toString());
				socketMessagingService.sendToRoom(room.getId(), message);
			}
		}

		Logger.getLogger(UsersService.class).error(username + " " + status);
		usersRepo.saveAndFlush(user);
	}
}
