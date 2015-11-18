package com.kimreik.model;

import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.FetchType;

@Embeddable
public class Game {

	@Embedded
	private MineField mineField;
	
	@ElementCollection(fetch=FetchType.LAZY)
	private Set<Point> openedField = new LinkedHashSet<Point>();
	
	@ElementCollection(fetch=FetchType.LAZY)
	private Set<Point> flags = new LinkedHashSet<Point>();
	
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
