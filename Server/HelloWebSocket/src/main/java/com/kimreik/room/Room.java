package com.kimreik.room;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.kimreik.model.Game;
import com.kimreik.model.MineField;
import com.kimreik.model.Player;

@Entity
public class Room {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String name;
	
	@ElementCollection
	private List<Player> players = new ArrayList<Player>();
	
	@Embedded
	private Game game;
	
	@Column
	private int gameType;
	
	@Column
	private boolean isStarted;
	
	@Column
	private boolean isFinished;
	
	@Column
	private boolean isWin;
	
	public Room(){
		
	}
	
	public Room(RoomDTO roomDTO){
		this.name = roomDTO.getName();
		Game newGame = new Game();
		MineField newMineField = new MineField();
		newMineField.setHeight(roomDTO.getHeight());
		newMineField.setWidth(roomDTO.getWidth());
		newMineField.setMinesCount(roomDTO.getMinesCount());
		newGame.setMineField(newMineField);
		this.game = newGame;
	}
	
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

	public List<Player> getPlayers() {
		return players;
	}

	public void setPlayers(List<Player> players) {
		this.players = players;
	}
	
	public void addPlayer(String playerName){
		Player newPlayer = new Player();
		newPlayer.setUsername(playerName);
		if(players==null) players = new ArrayList<Player>();
		
		players.add(newPlayer);
	}

	public void removePlayer(String playerName){
		players.remove(getPlayerByName(playerName));
	}
	
	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}
	
	
	private Player getPlayerByName(String name){
		for(Player p : players){
			if(p.getUsername().equals(name)) return p;
		}
		return null;
	}

	public int getGameType() {
		return gameType;
	}

	public void setGameType(int gameType) {
		this.gameType = gameType;
	}

	public boolean isStarted() {
		return isStarted;
	}

	public void setStarted(boolean isStarted) {
		this.isStarted = isStarted;
	}

	public boolean isFinished() {
		return isFinished;
	}

	public void setFinished(boolean isFinished) {
		this.isFinished = isFinished;
	}

	public boolean isWin() {
		return isWin;
	}

	public void setWin(boolean isWin) {
		this.isWin = isWin;
	}
	
	
}
