package com.kimreik.validators;

import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ResponseMessage {

	public static final ResponseMessage NOT_JOINED_TO_ROOM = new ResponseMessage("NOT_JOINED_TO_ROOM");
	public static final ResponseMessage USER_ALREADY_IN_SOME_ROOM = new ResponseMessage("USER_ALREADY_IN_SOME_ROOM");
	public static final ResponseMessage PLAYER_BOMBED = new ResponseMessage("PLAYER_BOMBED");
	
	
	public static final ResponseMessage USERNAME_ALREADY_EXIST = new ResponseMessage("USERNAME_ALREADY_EXIST");
	public static final ResponseMessage PASSWORDS_DONT_MATCH = new ResponseMessage("PASSWORDS_DONT_MATCH");
	
	private HashMap<String, Object> messages = new HashMap<String, Object>();

	public ResponseMessage(){
		
	}
	
	public ResponseMessage(String message) {
		messages.put("message", message);
	}
	
	public void addMessage(String key, Object value){
		messages.put(key, value);
	}

	public void setMessages(HashMap<String, Object> messages) {
		this.messages = messages;
	}

	public HashMap<String, Object> getMessages() {
		return messages;
	}
	
	@JsonIgnore
	public String getMessage(){
		return (String)messages.get("message");
	}
	
}
