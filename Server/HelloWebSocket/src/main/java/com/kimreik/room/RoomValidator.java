package com.kimreik.room;

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
		Room room = (Room) target;
		for (Room r : repo.findAll())
		{
			if (r.getName().equals(room.getName()))
			{
				error.rejectValue("name", ResponseMessage.ROOM_WITH_THIS_NAME_ALREADY_EXIST.getError());
				break;
			}
		}
		//TODO: ������ ��������� �������(�� ��������� ���)
	}
}
