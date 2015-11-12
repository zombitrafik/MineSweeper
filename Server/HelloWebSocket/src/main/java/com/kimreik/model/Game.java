package com.kimreik.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.FetchType;

@Embeddable
public class Game {

	@Embedded
	private MineField mineField;
	
	@ElementCollection(fetch=FetchType.EAGER)
	private Set<Point> openedField = new HashSet<Point>();
	
	@ElementCollection(fetch=FetchType.EAGER)
	private Set<Point> flags = new HashSet<Point>();
	
	public Set<Point> getOpenedField(){
		return openedField;
	}
	
	public void setOpenedField(Set<Point> openedField){
		this.openedField = openedField;
	}
	
	public MineField getMineField(){
		return mineField;
	}
	
	public void setMineField(MineField mineField){
		this.mineField=mineField;
	}

	public Set<Point> getFlags() {
		return flags;
	}

	public void setFlags(Set<Point> flags) {
		this.flags = flags;
	}
	
}