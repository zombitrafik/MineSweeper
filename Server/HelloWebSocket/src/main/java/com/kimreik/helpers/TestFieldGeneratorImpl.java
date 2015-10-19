package com.kimreik.helpers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.kimreik.model.MineField;
import com.kimreik.model.Point;

@Component("testGenerator")
public class TestFieldGeneratorImpl implements FieldGenerator {
		
	public MineField generate(Point startPoint, int width, int height, int minesCount) {
		int[][] matr =  new int[][]{
			{0,0,0,0,0,0,1,-1,1,0},
			{0,0,1,1,1,1,2,2,2,1},
			{0,0,1,-1,1,1,-1,2,2,-1},
			{1,1,3,2,2,1,1,2,-1,2},
			{2,-1,2,-1,2,1,0,1,1,1},
			{-1,2,2,3,-1,2,0,0,0,0},
			{1,1,0,2,-1,2,0,0,0,0},
			{0,0,0,1,1,1,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0},
			{0,0,0,0,0,0,0,0,0,0}
		};
		
		Set<Point> set = new HashSet<Point>();
		for(int i=0;i<matr.length;i++){
			for(int j=0;j<matr[i].length;j++){
				Point point = new Point();
				point.setX(j);
				point.setY(i);
				point.setValue(matr[i][j]);
				set.add(point);
			}
		}
		
		MineField res = new MineField();
		res.setHeight(height);
		res.setWidth(width);
		res.setMinesCount(minesCount);
		res.setField(set);
		
		return res;
	}
	
}
