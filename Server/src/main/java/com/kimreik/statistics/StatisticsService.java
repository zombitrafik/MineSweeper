package com.kimreik.statistics;

import com.kimreik.room.Room;
import com.kimreik.user.User;
import com.kimreik.user.UserDTO;
import com.kimreik.user.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticsService
{

	@Autowired
	EndedGameRepository		endedGameRepo;

	@Autowired
	private UsersRepository	usersRepository;

	/*
	public Page<EndedGame> getGamesOfUser(String username, Integer pageNumber, Integer pageSize) {
		PageRequest request = new PageRequest(pageNumber-1, pageSize,Sort.Direction.DESC, "date");
		return endedGameRepo.findAll(request);
	}
	 */
	public Page<EndedGame> getLeaderBoard(Pageable pageable)
	{
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.Direction.DESC, "score");
		return endedGameRepo.findAll(request);
	}

	public Page<UserDTO> getUsersLadder(Pageable pageable)
	{
		PageRequest request = new PageRequest(pageable.getPageNumber() - 1, pageable.getPageSize(), Sort.Direction.DESC, "rating");
		Page<User> users = usersRepository.findAll(request);
		List<UserDTO> result = new ArrayList<>();
		users.forEach(user -> result.add(new UserDTO(user)));
		return new PageImpl<>(result);
	}

	public void appendGameToStat(Room room)
	{
		endedGameRepo.save(new EndedGame(room));
	}

}
