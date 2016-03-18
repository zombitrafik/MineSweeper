package com.kimreik.game;

import com.kimreik.helpers.DebugTimer;
import com.kimreik.helpers.FieldGenerator;
import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.room.Room;
import com.kimreik.room.RoomsRepository;
import com.kimreik.services.SocketMessagingService;
import com.kimreik.statistics.StatisticsService;
import com.kimreik.user.User;
import com.kimreik.user.UsersRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class GameServiceImpl extends BasicGameEventsImpl implements GameService
{

	@Autowired
	UsersRepository					userRepo;

	@Autowired
	RoomsRepository					roomRepo;
	@Autowired
	StatisticsService				statService;
	@Autowired
	@Qualifier("simpleGenerator")
	//@Qualifier("testGenerator")
	FieldGenerator					fieldGenerator;
	Logger							logger	= Logger.getLogger(GameService.class);
	@Autowired
	private SocketMessagingService	socketMessagingService;

	@Transactional
	//������� ������ ��� http ������
	public ResponseEntity<?> handleGameClick(String username, Point point)
	{

		DebugTimer timer = new DebugTimer();

		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() == 0)
		{
			socketMessagingService.sendGameEventToUser(username, ResponseMessage.NOT_JOINED_TO_ROOM);
			return ResponseWrapper.wrap(ResponseMessage.NOT_JOINED_TO_ROOM, HttpStatus.BAD_REQUEST);
		}

		logger.error(timer.tick("start"));

		Set<Point> result;

		Room room = roomRepo.findOne(user.getCurrentRoomid());

		if (getPlayer(room, user.getUsername()).isBombed())
		{
			ResponseMessage message = ResponseMessage.PLAYER_BOMBED;
			message.add("username", user.getUsername());
			socketMessagingService.sendGameEventToUser(username, message);
			return ResponseWrapper.wrap(message, HttpStatus.OK);
		}

		logger.error(timer.tick("getRoom"));

		Game game = room.getGame();

		// ����� ����

		generateField(room, point, fieldGenerator);

		result = handleLeftClick(game, point);

		addPointsToPlayer(room, user.getUsername(), result.size()); //TODO add bomb logic

		game.getOpenedField().addAll(result);

		boolean findBomb = false;
		for (Point p : result)
		{
			if (p.getValue() == -1)
			{
				game.addExploidedBomb(p);
				findBomb = true;
			}
		}
		if (findBomb) bombPlayer(room, user.getUsername());

		checkGameEnd(room);

		roomRepo.save(room);

		logger.error(timer.tick("Open"));

		ResponseMessage message = ResponseMessage.FIELD_UPDATE;
		message.add("field", result);
		message.add("username", user.getUsername());
		message.add("points", result.size());
		socketMessagingService.sendToRoom(room.getId(), message);

		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> handleGameRightClick(String username, Point point)
	{
		User user = userRepo.findOne(username);

		Room room = roomRepo.findOne(user.getCurrentRoomid());

		if (getPlayer(room, user.getUsername()).isBombed())
		{
			ResponseMessage message = ResponseMessage.YOU_BOMBED;
			message.add("username", user.getUsername());

			socketMessagingService.sendGameEventToUser(username, message);

			return ResponseWrapper.wrap(message, HttpStatus.OK);
		}

		Game game = room.getGame();

		generateField(room, point, fieldGenerator);

		MineField mineField = game.getMineField();

		point = mineField.getPoint(point);

		if (game.getOpenedField().contains(point))
		{
			//� ������ ��� ������������ �� �����
			return ResponseWrapper.wrap(null, HttpStatus.OK);
		}

		Set<Point> result = new LinkedHashSet<Point>(); // ��� ��� ������ ������(��
		// ������� �����)

		if (game.getFlags().contains(point))
		{
			game.getFlags().remove(point);
			Point newPoint = new Point();
			newPoint.setX(point.getX());
			newPoint.setY(point.getY());
			newPoint.setValue(-3);// -3 ��� �� �������� ������.
			result.add(newPoint);
		}
		else
		{
			Point newPoint = new Point();
			newPoint.setX(point.getX());
			newPoint.setY(point.getY());
			newPoint.setValue(-2);
			result.add(newPoint);
			game.getFlags().add(newPoint);
		}

		roomRepo.save(room);

		ResponseMessage message = ResponseMessage.FIELD_UPDATE;
		message.add("field", result);
		message.add("username", user.getUsername());

		socketMessagingService.sendToRoom(room.getId(), message);

		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

	private void addPointsToPlayer(Room room, String playerName, int scoreToAdd)
	{
		Player player = getPlayer(room, playerName);
		if (player != null)
		{
			int currentScore = player.getCurrentScore();
			player.setCurrentScore(currentScore + scoreToAdd);
		}
	}

	private void bombPlayer(Room room, String playerName)
	{
		Player player = getPlayer(room, playerName);
		if (player != null)
		{
			player.setBombed(true);
			ResponseMessage message = ResponseMessage.PLAYER_BOMBED;
			message.add("username", player.getUsername());
			socketMessagingService.sendToRoom(room.getId(), message);
		}
	}

	private void checkGameEnd(Room room)
	{
		Game game = room.getGame();
		boolean isFinished = true;
		for (Player p : room.getPlayers())
		{
			if (!p.isBombed() && !p.isLeaved())
			{
				isFinished = false;
			}
		}
		if (isFinished)
		{
			room.setFinished(true);
			statService.appendGameToStat(room);
			socketMessagingService.sendToRoom(room.getId(), getStatistic(ResponseMessage.GAME_LOSE, room));
			return;
		}

		int fieldSize = game.getMineField().getHeight() * game.getMineField().getWidth();
		if (fieldSize - game.getOpenedField().size() - (game.getMineField().getMinesCount() - game.getExplodedBombs().size()) == 0)
		{

			room.setFinished(true);
			room.setWin(true);
			//TODO win coeff

			statService.appendGameToStat(room);
			socketMessagingService.sendToRoom(room.getId(), getStatistic(ResponseMessage.GAME_WIN, room));
		}
	}

	private Player getPlayer(Room room, String playerName)
	{
		for (Player p : room.getPlayers())
		{
			if (p.getUsername().equals(playerName))
			{
				return p;
			}
		}
		return null;
	}

	private ResponseMessage getStatistic(ResponseMessage message, Room room)
	{
		message.add("players", room.getPlayers());
		int score = 0;
		for (Player pl : room.getPlayers())
		{
			score += pl.getCurrentScore();
		}
		message.add("score", score);
		return message;
	}

	public List<Player> getStatistics(String username)
	{
		//need refactoring
		Room room = roomRepo.findOne(userRepo.findOne(username).getCurrentRoomid());
		return room.getPlayers();
	}

}
