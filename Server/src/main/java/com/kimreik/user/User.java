package com.kimreik.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
public class User
{

	@Id
	private String			username;

	private String			password;

	@JsonIgnore
	private String			matchingPassword;

	private String			role;

	private boolean			enabled;

	private int				currentRoomid;

	private int				rating;

	@JsonIgnore
	private long			lastActivity;

	@JsonIgnore
	private long			lastHeartBeat;

	@JsonIgnore
	private int				summaryRating;

	private int				playedGamesCount;

	@JsonIgnore
	@ElementCollection
	private List<String>	friends;

	@Enumerated(EnumType.STRING)
	private UserStatus		status;

	public String getUsername()
	{
		return username;
	}

	public void setUsername(String username)
	{
		this.username = username;
	}

	@JsonIgnore
	public String getPassword()
	{
		return password;
	}

	@JsonProperty
	public void setPassword(String password)
	{
		this.password = password;
	}

	@JsonIgnore
	public boolean getEnabled()
	{
		return enabled;
	}

	public void setEnabled(boolean enabled)
	{
		this.enabled = enabled;
	}

	@JsonIgnore
	public String getMatchingPassword()
	{
		return matchingPassword;
	}

	@JsonProperty
	public void setMatchingPassword(String matchingPassword)
	{
		this.matchingPassword = matchingPassword;
	}

	@JsonIgnore
	public String getRole()
	{
		return role;
	}

	public void setRole(String role)
	{
		this.role = role;
	}

	public int getCurrentRoomid()
	{
		return currentRoomid;
	}

	public void setCurrentRoomid(int currentRoomid)
	{
		this.currentRoomid = currentRoomid;
	}

	public List<String> getFriends()
	{
		return friends;
	}

	public void setFriends(List<String> friends)
	{
		this.friends = friends;
	}

	public void addFriend(String username)
	{
		friends.add(username);
	}

	public void removeFriend(String username)
	{
		friends.remove(username);
	}

	public long getLastActivity()
	{
		return lastActivity;
	}

	public void setLastActivity(long lastActivity)
	{
		this.lastActivity = lastActivity;
	}

	public UserStatus getStatus()
	{
		return status;
	}

	public void setStatus(UserStatus status)
	{
		this.status = status;
	}

	public long getLastHeartBeat()
	{
		return lastHeartBeat;
	}

	public void setLastHeartBeat(long lastHeartBeat)
	{
		this.lastHeartBeat = lastHeartBeat;
	}

	public int getRating()
	{
		return rating;
	}

	public void setRating(int rating)
	{
		this.rating = rating;
	}

	public int getSummaryRating()
	{
		return summaryRating;
	}

	public void setSummaryRating(int summaryRating)
	{
		this.summaryRating = summaryRating;
	}

	public int getPlayedGamesCount()
	{
		return playedGamesCount;
	}

	public void setPlayedGamesCount(int playedGamesCount)
	{
		this.playedGamesCount = playedGamesCount;
	}
}
