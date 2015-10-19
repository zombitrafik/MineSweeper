package com.kimreik.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GameRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String name;
	
	@ElementCollection
	private List<String> players = new ArrayList<String>();
	
	@Embedded
	private Game game;
	
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

	public void removePlayer(String playerName){
		players.remove(playerName);
	}
	
	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}
	
	
	
}
