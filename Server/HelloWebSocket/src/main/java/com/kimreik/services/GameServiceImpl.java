package com.kimreik.services;

import java.util.HashSet;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kimreik.helpers.DebugTimer;
import com.kimreik.helpers.FieldGenerator;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.model.Game;
import com.kimreik.model.GameRoom;
import com.kimreik.model.MineField;
import com.kimreik.model.Player;
import com.kimreik.model.Point;
import com.kimreik.model.User;
import com.kimreik.repositories.GameRoomRepository;
import com.kimreik.repositories.UserRepository;
import com.kimreik.validators.ErrorResponse;

@Service
public class GameServiceImpl extends BasicGameEventsImpl implements GameService {

	@Autowired
	UserRepository userRepo;

	@Autowired
	GameRoomRepository roomRepo;

	@Autowired
	@Qualifier("simpleGenerator")
	// @Qualifier("testGenerator")

	FieldGenerator fieldGenerator;

	Logger logger = Logger.getLogger(GameService.class);

	public ResponseEntity<?> handleGameClick(String username, Point point) {

		DebugTimer timer = new DebugTimer();
		
		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() == 0) {
			return ResponseWrapper.wrap(ErrorResponse.NOT_JOINED_TO_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		logger.error(timer.tick("start"));

		Set<Point> result = new HashSet<Point>();

		GameRoom room = roomRepo.findOne(user.getCurrentRoomid());

		logger.error(timer.tick("getRoom"));

		Game game = room.getGame();

		// старт игры
		
		
		generateField(room, point, fieldGenerator);

		result = handleLeftClick(game, point);
		
		addPointsToPlayer(room, user.getUsername(), result.size()); //TODO add bomb logic
		
		game.getOpenedField().addAll(result);
		roomRepo.save(room);
		
		logger.error(timer.tick("fastOpen"));
		
		return ResponseWrapper.wrap(result, HttpStatus.OK);
	}

	public ResponseEntity<?> handleGameRightClick(String username, Point point) {
		User user = userRepo.findOne(username);

		GameRoom room = roomRepo.findOne(user.getCurrentRoomid());

		Game game = room.getGame();

		generateField(room, point, fieldGenerator);

		MineField mineField = game.getMineField();

		point = mineField.getPoint(point);

		if (game.getOpenedField().contains(point)) {
			return ResponseWrapper.wrap(null, HttpStatus.OK);
		}

		Set<Point> result = new HashSet<Point>(); // сет для одного флажка(на
													// клиенте проще)

		if (game.getFlags().contains(point)) {
			game.getFlags().remove(point);
			Point newPoint = new Point();
			newPoint.setX(point.getX());
			newPoint.setY(point.getY());
			newPoint.setValue(-3);// -3 это не открытая клетка.
			result.add(newPoint);
		} else {
			Point newPoint = new Point();
			newPoint.setX(point.getX());
			newPoint.setY(point.getY());
			newPoint.setValue(-2);
			result.add(newPoint);
			game.getFlags().add(newPoint);
		}

		roomRepo.save(room);

		return ResponseWrapper.wrap(result, HttpStatus.OK);
	}
	
	private void addPointsToPlayer(GameRoom room, String playerName, int scoreToAdd){
		for(Player p :room.getPlayers()){
			if(p.getUsername().equals(playerName)){
				int currentScore = p.getCurrentScore();
				p.setCurrentScore(currentScore+scoreToAdd);
			}
		}
	}
	
	
}
