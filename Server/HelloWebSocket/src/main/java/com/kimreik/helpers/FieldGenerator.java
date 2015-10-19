package com.kimreik.helpers;

import com.kimreik.model.MineField;
import com.kimreik.model.Point;

public interface FieldGenerator {
	public MineField generate(Point startPoint, int width, int height, int minesCount);
	//public List<List<Integer>> generate(Point startPoint, int width, int height, int minesCount);
}
