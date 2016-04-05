package com.kimreik.room;

import com.kimreik.game.Player;
import com.kimreik.helpers.ResponseMessage;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class RoomValidator implements Validator
{

	RoomsRepository	repo;

	public RoomValidator(RoomsRepository repo)
	{
		this.repo = repo;
	}

	public boolean supports(Class<?> clazz)
	{
		return Room.class.equals(clazz);
	}

	public void validate(Object target, Errors error)
	{
		Room newRoom = (Room) target;
		if (repo.findAll().stream().filter(room -> room.getName().equals(newRoom.getName())).count() > 0)
		{
			error.rejectValue("name", ResponseMessage.ROOM_WITH_THIS_NAME_ALREADY_EXIST.getError());
		}

		if (newRoom.getPlayersCount() < 0)
		{
			error.rejectValue("playersCount", ResponseMessage.ROOM_PLAYERS_COUNT_MUST_BE_POSITIVE.getError());
		}
		
		Player leader = newRoom.getPlayers().get(0);

		if(newRoom.getMinRating()>leader.getRating()){
			error.rejectValue("minRating", ResponseMessage.ROOM_MIN_RATING_MUST_BE_LOWER_THAN_LEADER_RATING.getError());
		}

	}
}
