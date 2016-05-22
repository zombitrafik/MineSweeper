package com.kimreik.statistics;

import com.kimreik.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leaderboard")
public class LeaderBoardController
{

	@Autowired
	private StatisticsService	statService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<EndedGame> getLeaderBoard(Pageable pageable)
	{
		return statService.getLeaderBoard(pageable);
	}

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public Page<UserDTO> getUsersLadder(Pageable pageable)
	{
		return statService.getUsersLadder(pageable);
	}

	/*
	@RequestMapping(value="/user", method = RequestMethod.GET)
	public Page<EndedGame> getGamesOfUser(Principal principal, @RequestParam("page") int page,  @RequestParam("size") int size){
		return statService.getGamesOfUser(principal.getName(), page, size);
	}
	*/
}
