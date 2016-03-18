package com.kimreik.statistics;

import com.kimreik.game.MineField;
import com.kimreik.game.Player;
import com.kimreik.room.Room;
import org.apache.log4j.Logger;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class EndedGame
{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer			id;

	private String			name;

	private int				width;

	private int				height;

	private int				minesCount;

	private boolean			isWin;

	@ElementCollection
	private List<Player>	players	= new ArrayList<Player>();

	private int				score;

	private long			date;

	public EndedGame()
	{
		this.id = null;
		this.date = System.currentTimeMillis();
	}

	public EndedGame(Room room)
	{
		this.id = null;
		this.date = System.currentTimeMillis();

		this.name = room.getName();
		MineField mineField = room.getGame().getMineField();
		this.width = mineField.getWidth();
		this.height = mineField.getHeight();
		this.minesCount = mineField.getMinesCount();
		this.isWin = room.isWin();
		Logger logger = Logger.getLogger(EndedGame.class);
		this.players.addAll(room.getPlayers());
		int val = 0;
		for (Player pl : players)
		{
			val += pl.getCurrentScore();
		}
		this.score = val;
	}

	public Integer getId()
	{
		return id;
	}

	public void setId(Integer id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public int getWidth()
	{
		return width;
	}

	public void setWidth(int width)
	{
		this.width = width;
	}

	public int getHeight()
	{
		return height;
	}

	public void setHeight(int height)
	{
		this.height = height;
	}

	public int getMinesCount()
	{
		return minesCount;
	}

	public void setMinesCount(int minesCount)
	{
		this.minesCount = minesCount;
	}

	public boolean isWin()
	{
		return isWin;
	}

	public void setWin(boolean isWin)
	{
		this.isWin = isWin;
	}

	public List<Player> getPlayers()
	{
		return players;
	}

	public void setPlayers(List<Player> players)
	{
		this.players = players;
	}

	public int getScore()
	{
		return score;
	}

	public void setScore(int score)
	{
		this.score = score;
	}

	public long getDate()
	{
		return date;
	}

	public void setDate(long date)
	{
		this.date = date;
	}

}
