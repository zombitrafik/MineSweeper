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

		if (newRoom.getMinRating() > leader.getRating())
		{
			error.rejectValue("minRating", ResponseMessage.ROOM_MIN_RATING_MUST_BE_LOWER_THAN_LEADER_RATING.getError());
		}
		if (isTooEasy(newRoom))
		{
			error.reject(ResponseMessage.ROOM_IS_TOO_EASY.getError());
		}
		if (isTooHard(newRoom))
		{
			error.reject(ResponseMessage.ROOM_IS_TOO_HARD.getError());
		}
	}

	private boolean isTooEasy(Room newRoom)
	{
		double minesCoefficient = getMinesCoefficient(newRoom);
		return minesCoefficient < 0.1;
	}

	private boolean isTooHard(Room newRoom)
	{
		double minesCoefficient = getMinesCoefficient(newRoom);
		return minesCoefficient > 228.0 / 900;
	}

	private double getMinesCoefficient(Room newRoom)
	{
		int height = newRoom.getGame().getMineField().getHeight();
		int width = newRoom.getGame().getMineField().getWidth();
		int minesCount = newRoom.getGame().getMineField().getMinesCount();

		return (double)minesCount / (height * width);
	}

}
