package com.kimreik.room;

import com.kimreik.game.MineField;

public class RoomDTO
{

	private int		id;

	private String	name;

	private int		width;

	private int		height;

	private int		minesCount;

	public RoomDTO()
	{

	}

	public RoomDTO(Room room)
	{
		this.id = room.getId();
		this.name = room.getName();
		MineField mineField = room.getGame().getMineField();
		this.width = mineField.getWidth();
		this.height = mineField.getHeight();
		this.minesCount = mineField.getMinesCount();
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
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

}
