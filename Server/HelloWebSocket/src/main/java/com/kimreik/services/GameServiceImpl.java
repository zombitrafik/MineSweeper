package com.kimreik.services;

import java.util.HashSet;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kimreik.helpers.FieldGenerator;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.model.Game;
import com.kimreik.model.GameRoom;
import com.kimreik.model.MineField;
import com.kimreik.model.Point;
import com.kimreik.model.User;
import com.kimreik.repositories.GameRoomRepository;
import com.kimreik.repositories.UserRepository;
import com.kimreik.validators.ErrorResponse;

@Service
public class GameServiceImpl implements GameService {

	@Autowired
	UserRepository userRepo;
	
	@Autowired
	GameRoomRepository roomRepo;
	
	@Autowired
	@Qualifier("testGenerator")
	FieldGenerator fieldGenerator;

	Logger logger = Logger.getLogger(GameService.class);
	
	public ResponseEntity<?> handleGameClick(String username, Point point) {
		
		User user = userRepo.findOne(username);
		
		if(user.getCurrentRoomid()==0){
			return ResponseWrapper.wrap(ErrorResponse.NOT_JOINED_TO_ROOM, HttpStatus.BAD_REQUEST);
		}
		
		Set<Point> result = new HashSet<Point>();

		GameRoom room = roomRepo.findOne(user.getCurrentRoomid());

		Game game = room.getGame();
		
		MineField mineField = game.getMineField();
		//старт игры
		
		if(game.getOpenedField().size()==0){
			
			mineField = fieldGenerator.generate(point, mineField.getWidth(), mineField.getHeight(),
					mineField.getMinesCount());
			game.setMineField(mineField);

		}
	
		Point openedPoint = mineField.getPoint(point);
		
		//нажатие на уже раскрытую клетку(быстрое раскрытие)
		
		if(game.getOpenedField().contains(openedPoint)){
			if(openedPoint.getValue()==-2 || openedPoint.getValue()==0){
				return ResponseWrapper.wrap(result, HttpStatus.OK);
			}
			int realValue = openedPoint.getValue();
			Set<Point> nearbyPoints = mineField.getNearbyPoints(openedPoint);
			for(Point nearby: nearbyPoints){
				if(game.getFlags().contains(nearby)){
					realValue--;
				}
			}
			if(realValue==0){
				nearbyPoints.removeAll(game.getOpenedField());
				nearbyPoints.removeAll(game.getFlags());
				for(Point nearby: nearbyPoints){
					result.add(nearby);
				}
			}
			game.getOpenedField().addAll(result);
			roomRepo.save(room);
			return ResponseWrapper.wrap(result, HttpStatus.OK);
			
		}
		
		result.add(openedPoint);
		
		//нажатие на 0
		
		if(openedPoint.getValue()==0){
			openFreeSpace(game, result, openedPoint);
		}
		
		game.getOpenedField().addAll(result);
		
		roomRepo.save(room);
		
		return ResponseWrapper.wrap(result, HttpStatus.OK);
	}

	public ResponseEntity<?> handleGameRightClick(String username, Point point) {
		User user = userRepo.findOne(username);
		
		GameRoom room = roomRepo.findOne(user.getCurrentRoomid());
		
		Game game = room.getGame();
		
		MineField mineField = game.getMineField();
		
		point = mineField.getPoint(point);
		
		if(game.getOpenedField().contains(point)){
			return ResponseWrapper.wrap(null, HttpStatus.OK);
		}
		
		Point result;
		
		if(game.getFlags().contains(point)){
			game.getFlags().remove(point);
			result = point;
		}else{
			Point newPoint = new Point();
			newPoint.setX(point.getX());
			newPoint.setY(point.getY());
			newPoint.setValue(-2);
			result = newPoint;
			game.getFlags().add(newPoint);
		}
		
		roomRepo.save(room);
		
		return ResponseWrapper.wrap(result, HttpStatus.OK);
	}

	private Set<Point> openFreeSpace(Game game, Set<Point> freeSpace, Point startPoint) {

		int x = startPoint.getX();
		int y = startPoint.getY();

		Set<Point> nearbyPoints = game.getMineField().getNearbyPoints(x, y);
		
		for(Point point : nearbyPoints){
			checkCandidateForAutoOpen(game,point,freeSpace);
		}
		
		return freeSpace;
	}

	private void checkCandidateForAutoOpen(Game game, Point point, Set<Point> freeSpace) {
			
		if (isValidForAutoOpen(freeSpace, game.getOpenedField(), point)) {
			freeSpace.add(point);
			if (point.getValue() == 0) {
				freeSpace.addAll(openFreeSpace(game, freeSpace, point));
			}
		}
	}

	private boolean isValidForAutoOpen(Set<Point> space, Set<Point> opened, Point point) {
		return !(space.contains(point) || opened.contains(point));
	}
	
}
