package com.kimreik.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Point {

	@Column
	private int x;
	
	@Column
	private int y;
	
	@Column
	private int value;
	
	public Point(){
		
	}
	
	public Point(int x, int y, int value){
		this.x=x;
		this.y=y;
		this.value=value;
	}
	
	@Override
	public boolean equals(Object other){
		Point otherPoint = (Point) other;
		if(otherPoint.x==this.x && otherPoint.y==this.y){
			return true;
		}
		return false;
	}
	
	@Override
	public int hashCode(){
		return Integer.parseInt(x+y+"");
	}
				
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	
}
