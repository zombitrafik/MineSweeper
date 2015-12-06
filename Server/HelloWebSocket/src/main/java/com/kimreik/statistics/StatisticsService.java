package com.kimreik.statistics;

import org.springframework.data.domain.Page;

import com.kimreik.room.Room;

public interface StatisticsService {
	//public Page<EndedGame> getGamesOfUser(String username, Integer pageNumber, Integer pageSize);
	public Page<EndedGame> getLeaderBoard(Integer pageNumber, Integer pageSize);
	public void appendGameToStat(Room room);
}
