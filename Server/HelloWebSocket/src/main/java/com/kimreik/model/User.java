package com.kimreik.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class User {
	
	@Id
	private String username;
	
	@Column
	private String password;
	
	@JsonIgnore
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
	
	@JsonIgnore
	public String getPassword(){
		return password;
	}
	

	@JsonProperty
	public void setPassword(String password){
		this.password = password;
	}

	@JsonIgnore
	public boolean getEnabled(){
		return enabled;
	}
	
	public void setEnabled(boolean enabled){
		this.enabled = enabled;
	}
	
	@JsonIgnore
	public String getMatchingPassword(){
		return matchingPassword;
	}
	
	@JsonProperty
	public void setMatchingPassword(String matchingPassword){
		this.matchingPassword = matchingPassword;
	}
	
	@JsonIgnore
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
