package com.kimreik.game;

import com.kimreik.helpers.FieldGenerator;
import com.kimreik.room.Room;

import java.util.LinkedHashSet;
import java.util.Set;

public class BasicGameEventsImpl
{

	protected Set<Point> handleLeftClick(Game game, Point point)
	{

		Set<Point> result = new LinkedHashSet<Point>();

		MineField mineField = game.getMineField();

		Point openedPoint = game.getMineField().getPoint(point);

		result.add(openedPoint);

		// TODO: ��������� �������� ����� ��� ������
		// ������� �� ��� ��������� ������(������� ���������)

		if (game.getOpenedField().contains(openedPoint))
		{
			if (openedPoint.getValue() <= 0)
			{
				return result;
			}
			int realValue = openedPoint.getValue();
			Set<Point> nearbyPoints = mineField.getNearbyPoints(openedPoint);
			for (Point nearby : nearbyPoints)
			{
				if (game.getFlags().contains(nearby) || game.getExplodedBombs().contains(nearby))
				{
					realValue--;
				}
			}
			if (realValue == 0)
			{
				nearbyPoints.removeAll(game.getOpenedField());
				nearbyPoints.removeAll(game.getFlags());

				for (Point nearbyPoint : nearbyPoints)
				{
					result.add(nearbyPoint);
					if (nearbyPoint.getValue() == 0)
					{
						openFreeSpace(game, result, nearbyPoint);
					}
				}

				return result;
			}
		}

		// ������� �� 0

		if (openedPoint.getValue() == 0)
		{
			openFreeSpace(game, result, openedPoint);
		}

		return result;
	}

	private Set<Point> openFreeSpace(Game game, Set<Point> freeSpace, Point startPoint)
	{

		int x = startPoint.getX();
		int y = startPoint.getY();

		Set<Point> nearbyPoints = game.getMineField().getNearbyPoints(x, y);

		for (Point point : nearbyPoints)
		{
			checkCandidateForAutoOpen(game, point, freeSpace);
		}

		return freeSpace;
	}

	private void checkCandidateForAutoOpen(Game game, Point point, Set<Point> freeSpace)
	{

		if (isValidForAutoOpen(freeSpace, game, point))
		{
			freeSpace.add(point);

			if (point.getValue() == 0)
			{
				freeSpace.addAll(openFreeSpace(game, freeSpace, point));
			}
		}
	}

	private boolean isValidForAutoOpen(Set<Point> space, Game game, Point point)
	{

		return !(space.contains(point) || game.getOpenedField().contains(point) || game.getFlags().contains(point) || point.getValue() == -1);
	}

	protected void generateField(Room room, Point point, FieldGenerator fieldGenerator)
	{
		Game game = room.getGame();
		if (game.getOpenedField().size() != 0 || game.getFlags().size() != 0)
		{
			return;
		}
		MineField mineField = game.getMineField();
		mineField = fieldGenerator.generate(point, mineField.getWidth(), mineField.getHeight(), mineField.getMinesCount());
		game.setMineField(mineField);
		room.setStarted(true);
	}

}
