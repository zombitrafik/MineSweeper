package com.kimreik.game;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import java.util.LinkedHashSet;
import java.util.Set;

@Embeddable
public class MineField
{

	@ElementCollection(fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<Point>	field;

	private int			width;

	private int			height;

	private int			minesCount;

	public Point getPoint(int x, int y)
	{
		Point point = new Point();
		point.setX(x);
		point.setY(y);
		return getPoint(point);
	}

	public Point getPoint(Point point)
	{
		//TODO: try just field.get(point);

		for (Point p : field)
		{
			if (p.equals(point))
			{
				return p;
			}
		}
		return null;
	}

	public Set<Point> getNearbyPoints(int x, int y)
	{
		Set<Point> res = new LinkedHashSet<Point>();
		if (x != 0)
		{
			if (y != 0)
			{
				res.add(getPoint(x - 1, y - 1));
			}
			if (y != height - 1)
			{
				res.add(getPoint(x - 1, y + 1));
			}
			res.add(getPoint(x - 1, y));
		}
		if (x != width - 1)
		{
			if (y != 0)
			{
				res.add(getPoint(x + 1, y - 1));
			}
			if (y != height - 1)
			{
				res.add(getPoint(x + 1, y + 1));
			}
			res.add(getPoint(x + 1, y));
		}
		if (y != 0)
		{
			res.add(getPoint(x, y - 1));
		}
		if (y != height - 1)
		{
			res.add(getPoint(x, y + 1));
		}
		return res;
	}

	public Set<Point> getNearbyPoints(Point point)
	{
		return getNearbyPoints(point.getX(), point.getY());
	}

	public int getWidth()
	{
		return width;
	}

	public void setWidth(int width)
	{
		this.width = width;
	}

	public int getHeight()
	{
		return height;
	}

	public void setHeight(int height)
	{
		this.height = height;
	}

	public Set<Point> getField()
	{
		return field;
	}

	public void setField(Set<Point> field)
	{
		this.field = field;
	}

	public int getMinesCount()
	{
		return minesCount;
	}

	public void setMinesCount(int minesCount)
	{
		this.minesCount = minesCount;
	}

}
