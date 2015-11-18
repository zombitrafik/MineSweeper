package com.kimreik.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Player {

	@Column
	private String username;
	
	@Column
	private int currentScore;
	
	@Column
	private boolean isBombed;
	
	public String getUsername(){
		return username;
	}
	
	public void setUsername(String username){
		this.username = username;
	}

	public int getCurrentScore() {
		return currentScore;
	}

	public void setCurrentScore(int currentScore) {
		this.currentScore = currentScore;
	}

	public boolean isBombed() {
		return isBombed;
	}

	public void setBombed(boolean isBombed) {
		this.isBombed = isBombed;
	}
	
}
