package com.kimreik.game;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface GameService {
	public ResponseEntity<?> handleGameClick(String username, Point point);
	public ResponseEntity<?> handleGameRightClick(String username, Point point);
	public List<Player> getStatistics(String username);
	
}
