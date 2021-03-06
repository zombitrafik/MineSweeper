package com.kimreik.user;

public class UserDTO
{

	private String		username;
	private UserStatus	status;
	private int			rating;

	public UserDTO()
	{

	}

	public UserDTO(User user)
	{
		this.username = user.getUsername();
		this.status = user.getStatus();
		this.rating = user.getRating();
	}

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public UserStatus getStatus()
	{
		return status;
	}

	public void setStatus(UserStatus status)
	{
		this.status = status;
	}

	public int getRating()
	{
		return rating;
	}

	public void setRating(int rating)
	{
		this.rating = rating;
	}
}
