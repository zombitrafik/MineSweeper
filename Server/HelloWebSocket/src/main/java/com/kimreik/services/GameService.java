package com.kimreik.services;

import org.springframework.http.ResponseEntity;

import com.kimreik.model.Point;

public interface GameService {
	public ResponseEntity<?> handleGameClick(String username, Point point);
	public ResponseEntity<?> handleGameRightClick(String username, Point point);
	
}
