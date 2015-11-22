package com.kimreik.helpers;

import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ResponseMessage {

	public static final ResponseMessage ERROR = new ResponseMessage("ERROR");
	
	public static final ResponseMessage NOT_JOINED_TO_ROOM = ERROR.add("ERROR", "NOT_JOINED_TO_ROOM");
	public static final ResponseMessage USER_ALREADY_IN_SOME_ROOM = ERROR.add("ERROR","USER_ALREADY_IN_SOME_ROOM");
	public static final ResponseMessage PLAYER_BOMBED = ERROR.add("ERROR","PLAYER_BOMBED");
	
	
	public static final ResponseMessage USERNAME_ALREADY_EXIST = ERROR.add("ERROR","USERNAME_ALREADY_EXIST");
	public static final ResponseMessage PASSWORDS_DONT_MATCH = ERROR.add("ERROR","PASSWORDS_DONT_MATCH");
	
	public static final ResponseMessage FIELD_UPDATE = new ResponseMessage("FIELD_UPDATE");
	
	public static final ResponseMessage YOU_BOMBED = new ResponseMessage("YOU_BOMBED");
	public static final ResponseMessage GAME_LOSE = new ResponseMessage("GAME_LOSE");
	public static final ResponseMessage GAME_WIN = new ResponseMessage("GAME_WIN");
	
	
	private String type;
	private HashMap<String, Object> data = new HashMap<String, Object>();

	public ResponseMessage(String type) {
		this.setType(type);
	}
	
	public ResponseMessage add(String key, Object value){
		data.put(key, value);
		return this;
	}

	public void setMessages(HashMap<String, Object> messages) {
		this.data = messages;
	}

	public HashMap<String, Object> getMessages() {
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
