package com.kimreik.helpers;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashMap;

public class ResponseMessage
{

	public static final ResponseMessage	NOT_JOINED_TO_ROOM									= new ResponseMessage("NOT_JOINED_TO_ROOM");
	public static final ResponseMessage	USER_ALREADY_IN_SOME_ROOM							= new ResponseMessage("USER_ALREADY_IN_SOME_ROOM");
	public static final ResponseMessage	YOU_BOMBED											= new ResponseMessage("YOU_BOMBED");

	public static final ResponseMessage	USERNAME_ALREADY_EXIST								= error("USERNAME_ALREADY_EXIST");
	public static final ResponseMessage	PASSWORDS_DONT_MATCH								= error("PASSWORDS_DONT_MATCH");

	public static final ResponseMessage	ROOM_WITH_THIS_NAME_ALREADY_EXIST					= error("ROOM_WITH_THIS_NAME_ALREADY_EXIST");
	public static final ResponseMessage	ROOM_PLAYERS_COUNT_MUST_BE_POSITIVE					= error("ROOM_PLAYERS_COUNT_MUST_BE_POSITIVE");
	public static final ResponseMessage	ROOM_MIN_RATING_MUST_BE_LOWER_THAN_LEADER_RATING	= error("ROOM_MIN_RATING_MUST_BE_LOWER_THAN_LEADER_RATING");
	public static final ResponseMessage	ROOM_IS_TOO_EASY									= error("ROOM_IS_TOO_EASY");
	public static final ResponseMessage	ROOM_IS_TOO_HARD									= error("ROOM_IS_TOO_HARD");

	public static final ResponseMessage	FIELD_UPDATE										= new ResponseMessage("FIELD_UPDATE");

	public static final ResponseMessage	PLAYER_BOMBED										= new ResponseMessage("PLAYER_BOMBED");
	public static final ResponseMessage	GAME_LOSE											= new ResponseMessage("GAME_LOSE");
	public static final ResponseMessage	GAME_WIN											= new ResponseMessage("GAME_WIN");
	public static final ResponseMessage	GAME_STARTED										= new ResponseMessage("GAME_STARTED");

	public static final ResponseMessage	FIND_USER_RESULT									= new ResponseMessage("FIND_USER_RESULT");

	public static final ResponseMessage	PLAYER_JOINED										= new ResponseMessage("PLAYER_JOINED");
	public static final ResponseMessage	PLAYER_LEAVED										= new ResponseMessage("PLAYER_LEAVED");
	public static final ResponseMessage	LEADER_CHANGED										= new ResponseMessage("LEADER_CHANGED");

	public static final ResponseMessage	INVITE												= new ResponseMessage("INVITE");

	public static final ResponseMessage	PLAYER_STATUS_UPDATE								= new ResponseMessage("PLAYER_STATUS_UPDATE");

	public static final ResponseMessage	FRIEND_ADDED_SUCCESSFULLY							= new ResponseMessage("FRIEND_ADDED_SUCCESSFULLY");
	public static final ResponseMessage	FRIEND_ADDING_ERROR									= new ResponseMessage("FRIEND_ADDING_ERROR");

	public static final ResponseMessage	FRIEND_REMOVED_SUCCESSFULLY							= new ResponseMessage("FRIEND_REMOVED_SUCCESSFULLY");
	public static final ResponseMessage	FRIEND_REMOVNG_ERROR								= new ResponseMessage("FRIEND_REMOVNG_ERROR");

	public static final ResponseMessage	FRIENDS												= new ResponseMessage("FRIENDS");

	public static final ResponseMessage	DIALOGS												= new ResponseMessage("DIALOGS");
	public static final ResponseMessage	DIALOG												= new ResponseMessage("DIALOG");

	public static final ResponseMessage	PRIVATE_MESSAGE										= new ResponseMessage("PRIVATE_MESSAGE");
	public static final ResponseMessage	ROOM_MESSAGE										= new ResponseMessage("ROOM_MESSAGE");

	public static final ResponseMessage	HEARTBEAT											= new ResponseMessage("HEARTBEAT");

	private String						type;
	private HashMap<String, Object>		data												= new HashMap<String, Object>();

	public ResponseMessage(String type)
	{
		this.setType(type);
	}

	public static ResponseMessage error(String error)
	{
		return new ResponseMessage("ERROR").add("ERROR", error);
	}

	public ResponseMessage add(String key, Object value)
	{
		data.put(key, value);
		return this;
	}

	public HashMap<String, Object> getData()
	{
		return data;
	}

	public void setData(HashMap<String, Object> data)
	{
		this.data = data;
	}

	@JsonIgnore
	public String getError()
	{
		return (String) data.get("ERROR");
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

}
