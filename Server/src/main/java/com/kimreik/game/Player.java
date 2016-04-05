package com.kimreik.game;

import javax.persistence.Embeddable;

@Embeddable
public class Player
{

	private String	username;

	private int		currentScore;

	private boolean	isBombed;

	private boolean	isLeaved;

	private boolean	leader;

	private int		rating;

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	public int getCurrentScore()
	{
		return currentScore;
	}

	public void setCurrentScore(int currentScore)
	{
		this.currentScore = currentScore;
	}

	public boolean isBombed()
	{
		return isBombed;
	}

	public void setBombed(boolean isBombed)
	{
		this.isBombed = isBombed;
	}

	public boolean isLeaved()
	{
		return isLeaved;
	}

	public void setLeaved(boolean isLeaved)
	{
		this.isLeaved = isLeaved;
	}

	public boolean isLeader()
	{
		return leader;
	}

	public void setLeader(boolean leader)
	{
		this.leader = leader;
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
