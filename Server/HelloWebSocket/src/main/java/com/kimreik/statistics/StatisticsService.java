package com.kimreik.statistics;

import com.kimreik.room.Room;
import org.springframework.data.domain.Page;

public interface StatisticsService
{
	//public Page<EndedGame> getGamesOfUser(String username, Integer pageNumber, Integer pageSize);
	Page<EndedGame> getLeaderBoard(Integer pageNumber, Integer pageSize);

	void appendGameToStat(Room room);
}
