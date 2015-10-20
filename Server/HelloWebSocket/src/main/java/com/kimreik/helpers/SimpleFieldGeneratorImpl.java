package com.kimreik.helpers;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kimreik.model.MineField;
import com.kimreik.model.Point;

@Component("simpleGenerator")
public class SimpleFieldGeneratorImpl implements FieldGenerator {

	Logger logger = Logger.getLogger(SimpleFieldGeneratorImpl.class);
	
	public MineField generate(Point startPoint, int width, int height, int minesCount) {
		MineField res = new MineField();
		res.setHeight(height);
		res.setWidth(width);
		res.setMinesCount(minesCount);
		
		Set<Point> field = new HashSet<Point>();
		List<Integer> vect = new ArrayList<Integer>();
		
		Set<Point> mines = new HashSet<Point>();

		for (int i = 0; i < width * height; i++) {
			if (i != startPoint.getY() * width + startPoint.getX())
				vect.add(i);
			Point newPoint = new Point();
			newPoint.setValue(0);
			newPoint.setX(i%width);
			newPoint.setY(i/width);
			field.add(newPoint);
		}
		
		res.setField(field);

		for (int i = 0; i < minesCount; i++) {
			int rand = new Random().nextInt(vect.size());
			Point point = new Point();
			point.setX(vect.get(rand) % width);
			point.setY(vect.get(rand) / width);
			point.setValue(-1);
			res.getPoint(point).setValue(-1);
			mines.add(point);
			vect.remove(rand);
		}
				
		
		for (Point point : mines) {
			for(Point p: res.getNearbyPoints(point)){
				updatePoint(p);
			}
		}
		
		return res;
	}
	
	private static void updatePoint(Point point) {
		int val = point.getValue();
		if(val!=-1){
			point.setValue(val+1);
		}
	}

}
