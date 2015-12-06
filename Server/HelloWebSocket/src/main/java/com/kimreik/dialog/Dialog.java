package com.kimreik.dialog;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Dialog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ElementCollection
	private List<PrivateMessage> messages = new ArrayList<PrivateMessage>();

	@Column
	private String user1;
	
	@Column
	private String user2;
	
	@Column
	private PrivateMessage lastMessage;
	
	public List<PrivateMessage> getMessages() {
		return messages;
	}

	public void setMessages(List<PrivateMessage> messages) {
		this.messages = messages;
	}

	public void addMessage(PrivateMessage message){
		messages.add(message);
		lastMessage=message;
	}

	public String getUser1() {
		return user1;
	}

	public void setUser1(String user1) {
		this.user1 = user1;
	}

	public String getUser2() {
		return user2;
	}

	public void setUser2(String user2) {
		this.user2 = user2;
	}

	public PrivateMessage getLastMessage() {
		return lastMessage;
	}

	public void setLastMessage(PrivateMessage lastMessage) {
		this.lastMessage = lastMessage;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
		
}
