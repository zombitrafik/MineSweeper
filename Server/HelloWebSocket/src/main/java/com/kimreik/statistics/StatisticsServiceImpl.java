package com.kimreik.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.kimreik.room.Room;

@Service
public class StatisticsServiceImpl implements StatisticsService{

	@Autowired
	EndedGameRepository endedGameRepo;
	/*
	public Page<EndedGame> getGamesOfUser(String username, Integer pageNumber, Integer pageSize) {
		PageRequest request = new PageRequest(pageNumber-1, pageSize,Sort.Direction.DESC, "date");
		return endedGameRepo.findAll(request);
	}
	 */
	public Page<EndedGame> getLeaderBoard(Integer pageNumber, Integer pageSize) {
		PageRequest request = new PageRequest(pageNumber-1, pageSize,Sort.Direction.DESC, "score");
		return endedGameRepo.findAll(request);
	}

	public void appendGameToStat(Room room) {
		endedGameRepo.save(new EndedGame(room));
	}

}
