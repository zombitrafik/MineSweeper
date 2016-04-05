package com.kimreik.room;

import com.kimreik.game.Game;
import com.kimreik.game.Player;
import com.kimreik.user.User;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Room
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer			id;

	private String			name;

	@ElementCollection
	private List<Player>	players	= new ArrayList<>();

	@Embedded
	private Game			game;

	private int				gameType;

	private int				playersCount;

	private int				minRating;

	private boolean			isStarted;

	private boolean			isFinished;

	private boolean			isWin;

	private int				nextRoomId;

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public List<Player> getPlayers()
	{
		return players;
	}

	public void setPlayers(List<Player> players)
	{
		this.players = players;
	}

	public Game getGame()
	{
		return game;
	}

	public void setGame(Game game)
	{
		this.game = game;
	}

	public int getGameType()
	{
		return gameType;
	}

	public void setGameType(int gameType)
	{
		this.gameType = gameType;
	}

	public boolean isStarted()
	{
		return isStarted;
	}

	public void setStarted(boolean isStarted)
	{
		this.isStarted = isStarted;
	}

	public boolean isFinished()
	{
		return isFinished;
	}

	public void setFinished(boolean isFinished)
	{
		this.isFinished = isFinished;
	}

	public boolean isWin()
	{
		return isWin;
	}

	public void setWin(boolean isWin)
	{
		this.isWin = isWin;
	}

	public int getNextRoomId()
	{
		return nextRoomId;
	}

	public void setNextRoomId(int nextRoomId)
	{
		this.nextRoomId = nextRoomId;
	}

	public int getPlayersCount()
	{
		return playersCount;
	}

	public void setPlayersCount(int playersCount)
	{
		this.playersCount = playersCount;
	}

	public int getMinRating()
	{
		return minRating;
	}

	public void setMinRating(int minRating)
	{
		this.minRating = minRating;
	}
}
