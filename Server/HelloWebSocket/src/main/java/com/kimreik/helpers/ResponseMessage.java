package com.kimreik.helpers;

import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ResponseMessage {
	
	public static final ResponseMessage NOT_JOINED_TO_ROOM = error("NOT_JOINED_TO_ROOM");
	public static final ResponseMessage USER_ALREADY_IN_SOME_ROOM = error("USER_ALREADY_IN_SOME_ROOM");
	public static final ResponseMessage YOU_BOMBED = error("YOU_BOMBED");
	
	
	public static final ResponseMessage USERNAME_ALREADY_EXIST = error("USERNAME_ALREADY_EXIST");
	public static final ResponseMessage PASSWORDS_DONT_MATCH = error("PASSWORDS_DONT_MATCH");
	
	public static final ResponseMessage ROOM_WITH_THIS_NAME_ALREADY_EXIST = error("ROOM_WITH_THIS_NAME_ALREADY_EXIST");
	
	public static final ResponseMessage FIELD_UPDATE = new ResponseMessage("FIELD_UPDATE");
	
	public static final ResponseMessage PLAYER_BOMBED = new ResponseMessage("PLAYER_BOMBED");
	public static final ResponseMessage GAME_LOSE = new ResponseMessage("GAME_LOSE");
	public static final ResponseMessage GAME_WIN = new ResponseMessage("GAME_WIN");
	
	public static final ResponseMessage FIND_USER_RESULT = new ResponseMessage("FIND_USER_RESULT");
	
	public static final ResponseMessage FRIEND_ADDED_SUCCESSFULLY = new ResponseMessage("FRIEND_ADDED_SUCCESSFULLY");
	public static final ResponseMessage FRIEND_ADDING_ERROR = new ResponseMessage("FRIEND_ADDING_ERROR");
	
	public static final ResponseMessage FRIEND_REMOVED_SUCCESSFULLY = new ResponseMessage("FRIEND_REMOVED_SUCCESSFULLY");
	public static final ResponseMessage FRIEND_REMOVNG_ERROR = new ResponseMessage("FRIEND_REMOVNG_ERROR");
	
	public static final ResponseMessage FRIENDS = new ResponseMessage("FRIENDS");
	
	
	public static final ResponseMessage PRIVATE_MESSAGE = new ResponseMessage("PRIVATE_MESSAGE");
	
	public static final ResponseMessage HEARTBEAT = new ResponseMessage("HEARTBEAT");
	
	private String type;
	private HashMap<String, Object> data = new HashMap<String, Object>();

	public static ResponseMessage error(String error){
		return new ResponseMessage("ERROR").add("ERROR", error); 
	}
	
	public ResponseMessage(String type) {
		this.setType(type);
	}
	
	public ResponseMessage add(String key, Object value){
		data.put(key, value);
		return this;
	}

	public void setData(HashMap<String, Object> data) {
		this.data = data;
	}

	public HashMap<String, Object> getData() {
		return data;
	}
	
	@JsonIgnore
	public String getError(){
		return (String)data.get("ERROR");
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
