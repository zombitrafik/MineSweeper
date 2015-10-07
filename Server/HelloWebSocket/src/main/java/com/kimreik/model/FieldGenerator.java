package com.kimreik.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class FieldGenerator {

	private static int[][] field;

	public static int[][] generateForTest(){
		return new int[][]{
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
	}
	
	public static int[][] generate(Point startPoint, int width, int height, int minesCount) {
		List<Integer> vect = new ArrayList<Integer>();

		List<Integer> minesPositions = new ArrayList<Integer>();

		field = new int[width][height];
		for (int i = 0; i < width * height; i++) {
			if (i != startPoint.getY() * width + startPoint.getX())
				vect.add(i);
		}

		for (int i = 0; i < minesCount; i++) {
			int rand = new Random().nextInt(vect.size());
			field[vect.get(rand) % width][vect.get(rand) / width] = -1;
			minesPositions.add(vect.get(rand));
			vect.remove(rand);
		}

		for (int i : minesPositions) {
			int x = i % width;
			int y = i / width;

			if (x != 0) {
				if (y != 0) {
					updatePoint(x - 1, y - 1);
				}
				if (y != height - 1) {
					updatePoint(x - 1, y + 1);
				}
				updatePoint(x - 1, y);
			}

			if (x != width - 1) {
				if (y != height - 1) {
					updatePoint(x + 1, y + 1);
				}
				if(y!=0){
					updatePoint(x + 1, y - 1);
				}
				updatePoint(x + 1, y);
			}
			if (y != 0)
				updatePoint(x, y - 1);
			if (y != height - 1)
				updatePoint(x, y + 1);
		}
		return field;
	}

	private static void updatePoint(int x, int y) {
		field[x][y] = field[x][y] == -1 ? -1 : field[x][y] + 1;
	}

}
