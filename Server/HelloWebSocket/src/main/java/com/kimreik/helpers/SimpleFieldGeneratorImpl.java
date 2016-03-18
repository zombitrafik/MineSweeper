package com.kimreik.helpers;

import com.kimreik.game.MineField;
import com.kimreik.game.Point;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.*;

@Component("simpleGenerator")
public class SimpleFieldGeneratorImpl implements FieldGenerator
{

	Logger	logger	= Logger.getLogger(SimpleFieldGeneratorImpl.class);

	private static void updatePoint(Point point)
	{
		int val = point.getValue();
		if (val != -1)
		{
			point.setValue(val + 1);
		}
	}

	public MineField generate(Point startPoint, int width, int height, int minesCount)
	{
		MineField res = new MineField();
		res.setHeight(height);
		res.setWidth(width);
		res.setMinesCount(minesCount);

		Set<Point> field = new LinkedHashSet<>();
		List<Integer> vect = new ArrayList<>();

		Set<Point> mines = new LinkedHashSet<>();

		for (int i = 0; i < width * height; i++)
		{
			if (i != startPoint.getY() * width + startPoint.getX()) vect.add(i);
			Point newPoint = new Point();
			newPoint.setValue(0);
			newPoint.setX(i % width);
			newPoint.setY(i / width);
			field.add(newPoint);
		}

		res.setField(field);

		for (int i = 0; i < minesCount; i++)
		{
			int rand = new Random().nextInt(vect.size());
			Point point = new Point();
			point.setX(vect.get(rand) % width);
			point.setY(vect.get(rand) / width);
			point.setValue(-1);
			res.getPoint(point).setValue(-1);
			mines.add(point);
			vect.remove(rand);
		}

		for (Point point : mines)
		{
			res.getNearbyPoints(point).forEach(SimpleFieldGeneratorImpl::updatePoint);
		}

		return res;
	}

}
