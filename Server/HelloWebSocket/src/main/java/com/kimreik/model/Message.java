package com.kimreik.model;

import java.util.Date;

public class Message {

	private String text;
	private String senderName;
	private Date date;

	public void setText(String text) {
		this.text = text;
	}

	public String getText() {
		return text;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	
	public String getSenderName(){
		return senderName;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
