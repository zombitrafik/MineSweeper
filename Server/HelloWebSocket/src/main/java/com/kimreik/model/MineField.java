package com.kimreik.model;

import java.util.HashSet;
import java.util.Set;

import org.apache.log4j.Logger;

public class MineField {

	private int minesCount;

	private int[][] field;

	private Set<Point> openedField;

	private int width;
	private int height;

	Logger logger = Logger.getLogger(MineField.class);
	
	public MineField(int width, int height, int minesCount) {
		this.setWidth(width);
		this.setHeight(height);
		this.setMinesCount(minesCount);

		openedField = new HashSet<Point>();
	}

	public Set<Point> handleClick(Point point) {
		logger.error("startPoint "+point.getX()+":"+point.getY());
		Set<Point> result = new HashSet<Point>();

		if (openedField.size() == 0) {
			field = FieldGenerator.generateForTest();
			//field = FieldGenerator.generate(point, width, height, minesCount);
		}

		Point openedPoint = new Point(point.getX(), point.getY(), field[point.getY()][point.getX()]);

		if (openedPoint.getValue() != 0) {
			result.add(openedPoint);
			openedField.add(openedPoint);
			return result;
		}
		
		result.add(openedPoint);

		openFreeSpace(result, openedPoint);
		openedField.addAll(result);
		return result;
	}


	private Set<Point> openFreeSpace(Set<Point> freeSpace, Point startPoint){
		logger.error("openFreeSpace "+freeSpace.size());
		
		//List<Point> newFreeSpace = new ArrayList<Point>(freeSpace);
		int x = startPoint.getX();
		int y = startPoint.getY();
		
		logger.error("point "+startPoint.getX()+":"+startPoint.getY()+" = "+startPoint.getValue()+" real "+field[startPoint.getY()][startPoint.getX()]);
		if(x!=0){
			if(y!=0){
				checkCandidateForAutoOpen(x-1, y-1, freeSpace);
			}
			if(y!=height-1){
				checkCandidateForAutoOpen(x-1, y+1, freeSpace);
			}
			checkCandidateForAutoOpen(x-1, y, freeSpace);
		}
		if(x!=width-1){
			if(y!=0){
				checkCandidateForAutoOpen(x+1, y-1, freeSpace);
			}
			if(y!=height-1){
				checkCandidateForAutoOpen(x+1, y+1, freeSpace);
			}
			checkCandidateForAutoOpen(x+1, y, freeSpace);
		}
		if(y!=0){
			checkCandidateForAutoOpen(x, y-1, freeSpace);
		}
		if(y!=height-1){
			checkCandidateForAutoOpen(x, y+1, freeSpace);
		}
		logger.error("endSize = "+freeSpace.size());
		return freeSpace;
	}

	private void checkCandidateForAutoOpen(int x, int y, Set<Point> freeSpace){
		Point candidatePoint = new Point(
				x,
				y,
				field[y][x]);
		
		if(isValidForAutoOpen(freeSpace, candidatePoint)){
			
			freeSpace.add(candidatePoint);
			logger.error("addding "+x+":"+y);
			if(candidatePoint.getValue()==0){
				int size = freeSpace.size();
				freeSpace.addAll(openFreeSpace(freeSpace,candidatePoint));
				logger.error("before="+size+" after="+freeSpace.size());
				//sub
			}
		}
	}
	
	private boolean isValidForAutoOpen(Set<Point> space, Point point) {
		for (Point otherPoint : space) {
			if (point.equals(otherPoint))
				return false;
		}
		return true;
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
	
	public int[][] getField(){
		return field;
	}	
	
	public void setField(int[][] field){
		this.field=field;
	}

	public void setMinesCount(int minesCount) {
		this.minesCount = minesCount;
	}

}
