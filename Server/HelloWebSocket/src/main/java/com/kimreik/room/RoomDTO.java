package com.kimreik.room;

public class RoomDTO {
	
	private int id;
	
	private String name;

	private int width;
	
	private int height;
	
	private int minesCount;
	
	public RoomDTO(){
	
	}
	
	public RoomDTO(Room room){
		this.id=room.getId();
		this.name = room.getName();
		this.width = room.getGame().getMineField().getWidth();
		this.height = room.getGame().getMineField().getHeight();
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getMinesCount() {
		return minesCount;
	}

	public void setMinesCount(int minesCount) {
		this.minesCount = minesCount;
	}
	
	
}
