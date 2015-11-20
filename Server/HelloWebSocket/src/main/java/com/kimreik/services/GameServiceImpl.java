package com.kimreik.services;

import java.util.LinkedHashSet;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.kimreik.validators.ResponseMessage;

@Service
public class GameServiceImpl extends BasicGameEventsImpl implements GameService {

	@Autowired
	UserRepository userRepo;

	@Autowired
	GameRoomRepository roomRepo;

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@Autowired
	@Qualifier("simpleGenerator")
	//@Qualifier("testGenerator")

	FieldGenerator fieldGenerator;

	Logger logger = Logger.getLogger(GameService.class);

	@Transactional
	public ResponseEntity<?> handleGameClick(String username, Point point) {

		DebugTimer timer = new DebugTimer();
		
		User user = userRepo.findOne(username);

		if (user.getCurrentRoomid() == 0) {
			return ResponseWrapper.wrap(ResponseMessage.NOT_JOINED_TO_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		logger.error(timer.tick("start"));

		Set<Point> result = new LinkedHashSet<Point>();

		GameRoom room = roomRepo.findOne(user.getCurrentRoomid());
		
		
		if(getPlayer(room, user.getUsername()).isBombed()){
			return ResponseWrapper.wrap(ResponseMessage.PLAYER_BOMBED, HttpStatus.OK);
		}
		
		logger.error(timer.tick("getRoom"));

		Game game = room.getGame();

		// старт игры
		
		
		generateField(room, point, fieldGenerator);

		result = handleLeftClick(game, point);
		
		addPointsToPlayer(room, user.getUsername(), result.size()); //TODO add bomb logic
				
		game.getOpenedField().addAll(result);
		
		boolean findBomb = false;
		for(Point p: result){
			if(p.getValue()==-1){
				game.addExploidedBomb(p);
				findBomb=true;
			}
		}
		if(findBomb) bombPlayer(room, user.getUsername());
		
		
		checkGameEnd(room);
		
		roomRepo.save(room);
		
		logger.error(timer.tick("Open"));
		
		return ResponseWrapper.wrap(result, HttpStatus.OK);
	}

	@Transactional
	public ResponseEntity<?> handleGameRightClick(String username, Point point) {
		User user = userRepo.findOne(username);

		GameRoom room = roomRepo.findOne(user.getCurrentRoomid());

		if(getPlayer(room, user.getUsername()).isBombed()){
			return ResponseWrapper.wrap(ResponseMessage.PLAYER_BOMBED, HttpStatus.OK);
		}
		
		Game game = room.getGame();

		generateField(room, point, fieldGenerator);

		MineField mineField = game.getMineField();

		point = mineField.getPoint(point);

		if (game.getOpenedField().contains(point)) {
			return ResponseWrapper.wrap(null, HttpStatus.OK);
		}

		Set<Point> result = new LinkedHashSet<Point>(); // сет для одного флажка(на
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
		Player player = getPlayer(room, playerName);
		if(player!=null){
			int currentScore = player.getCurrentScore();
			player.setCurrentScore(currentScore+scoreToAdd);
		}
	}
	
	private void bombPlayer(GameRoom room, String playerName){
		Player player = getPlayer(room, playerName);
		if(player!=null){
			player.setBombed(true);
			simpMessagingTemplate.convertAndSend("/broker/rooms/"+room.getId(), ResponseWrapper.wrap(new ResponseMessage("YOU BOMBED"), HttpStatus.OK));
			
		}
	}
	
	private void checkGameEnd(GameRoom room){
		Game game = room.getGame();
		boolean isFinished = true;
		for(Player p : room.getPlayers()){
			if(!p.isBombed()){
				isFinished=false;
			}
		}
		if(isFinished){
			room.setFinished(true);
			simpMessagingTemplate.convertAndSend("/broker/rooms/"+room.getId(), ResponseWrapper.wrap(new ResponseMessage("game finished with lose"), HttpStatus.OK));
			return;
		}
		
		int fieldSize = game.getMineField().getHeight()*game.getMineField().getWidth();
		if(fieldSize - game.getOpenedField().size() - (game.getMineField().getMinesCount()-game.getExplodedBombs().size())==0){
			room.setFinished(true);
			room.setWin(true);
			simpMessagingTemplate.convertAndSend("/broker/rooms/"+room.getId(), ResponseWrapper.wrap(new ResponseMessage("game finished with win"), HttpStatus.OK));
		}
		
	}
	
	private Player getPlayer(GameRoom room, String playerName){
		for(Player p :room.getPlayers()){
			if(p.getUsername().equals(playerName)){
				return p;
			}
		}
		return null;
	}
	
	
}
