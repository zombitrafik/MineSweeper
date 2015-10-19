package com.kimreik.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
	
	@Id
	private String username;
	
	@Column
	private String password;
	
	private String matchingPassword;
	
	@Column
	private String role;
	
	@Column
	private boolean enabled;
	
	@Column
	private int currentRoomid;
	
	public String getUsername(){
		return username;
	}
	
	public void setUsername(String username){
		this.username = username;
	}
	
	public String getPassword(){
		return password;
	}
	
	public void setPassword(String password){
		this.password = password;
	}

	public boolean getEnabled(){
		return enabled;
	}
	
	public void setEnabled(boolean enabled){
		this.enabled = enabled;
	}
	
	public String getMatchingPassword(){
		return matchingPassword;
	}
	
	public void setMatchingPassword(String matchingPassword){
		this.matchingPassword = matchingPassword;
	}
	
	public String getRole(){
		return role;
	}
	
	public void setRole(String role){
		this.role = role;
	}

	public int getCurrentRoomid() {
		return currentRoomid;
	}

	public void setCurrentRoomid(int currentRoomid) {
		this.currentRoomid = currentRoomid;
	}
	
}
