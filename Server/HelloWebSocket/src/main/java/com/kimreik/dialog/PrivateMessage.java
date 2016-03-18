package com.kimreik.dialog;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PrivateMessage
{

	@Column
	private String	sender;

	@Column
	private String	recipient;

	@Column
	private String	message;

	public String getSender()
	{
		return sender;
	}

	public void setSender(String sender)
	{
		this.sender = sender;
	}

	public String getRecipient()
	{
		return recipient;
	}

	public void setRecipient(String recipient)
	{
		this.recipient = recipient;
	}

	public String getMessage()
	{
		return message;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}

}
