package com.kimreik.model;

import java.util.ArrayList;
import java.util.List;


public class GameRoom {

	private Integer id;
	
	private String name;
	
	private List<String> players = new ArrayList<String>();
		
	private MineField mineField;
	
	public String getName(){
		return name;
	}
	
	public void setName(String name){
		this.name=name;
	}
	
	public Integer getId(){
		return id;
	}
	
	public void setId(Integer id){
		this.id=id;
	}

	public List<String> getPlayers() {
		return players;
	}

	public void setPlayers(List<String> players) {
		this.players = players;
	}
	
	public void addPlayer(String playerName){
		if(players==null) players = new ArrayList<String>();
		
		players.add(playerName);
	}

	public MineField getMineField() {
		return mineField;
	}

	public void setMineField(MineField mineField) {
		this.mineField = mineField;
	}
	
	
	
}
