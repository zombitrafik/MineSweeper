package com.kimreik.room;

import com.kimreik.game.Game;
import com.kimreik.game.MineField;
import com.kimreik.game.Player;

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
	private List<Player>	players	= new ArrayList<Player>();

	@Embedded
	private Game			game;

	private int				gameType;

	private boolean			isStarted;

	private boolean			isFinished;

	private boolean			isWin;

	private int				nextRoomId;

	public Room()
	{

	}

	public Room(RoomDTO roomDTO)
	{
		this.name = roomDTO.getName();
		Game newGame = new Game();
		MineField newMineField = new MineField();
		newMineField.setHeight(roomDTO.getHeight());
		newMineField.setWidth(roomDTO.getWidth());
		newMineField.setMinesCount(roomDTO.getMinesCount());
		newGame.setMineField(newMineField);
		this.game = newGame;
	}

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

	public void addPlayer(String playerName)
	{
		Player newPlayer = new Player();
		newPlayer.setUsername(playerName);
		if (players == null) players = new ArrayList<Player>();

		players.add(newPlayer);
	}

	public void setPlayerLeaved(String playerName, boolean isLeaved)
	{
		Player player = getPlayerByName(playerName);
		player.setLeaved(isLeaved);
	}

	public Game getGame()
	{
		return game;
	}

	public void setGame(Game game)
	{
		this.game = game;
	}

	public Player getPlayerByName(String name)
	{
		for (Player p : players)
		{
			if (p.getUsername().equals(name)) return p;
		}
		return null;
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

}
