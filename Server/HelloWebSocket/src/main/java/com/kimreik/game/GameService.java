package com.kimreik.game;

import org.springframework.http.ResponseEntity;

import java.util.List;

public interface GameService
{
	ResponseEntity<?> handleGameClick(String username, Point point);

	ResponseEntity<?> handleGameRightClick(String username, Point point);

	List<Player> getStatistics(String username);

}
