package com.kimreik.helpers;

import com.kimreik.game.MineField;
import com.kimreik.game.Point;

public interface FieldGenerator
{
	MineField generate(Point startPoint, int width, int height, int minesCount);
	//public List<List<Integer>> generate(Point startPoint, int width, int height, int minesCount);
}
