package com.kimreik.dialog;

import com.kimreik.model.PrivateMessage;

public class DialogDTO {
	
	private PrivateMessage lastMessage;
	
	private String username;

	public DialogDTO(){
		
	}
	
	public DialogDTO(PrivateMessage lastMessage, String username){
		this.lastMessage=lastMessage;
		this.setUsername(username);
	}
	
	public PrivateMessage getLastMessage() {
		return lastMessage;
	}

	public void setLastMessage(PrivateMessage lastMessage) {
		this.lastMessage = lastMessage;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
