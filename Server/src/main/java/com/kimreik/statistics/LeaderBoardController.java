package com.kimreik.statistics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/leaderboard")
public class LeaderBoardController
{

	@Autowired
	private StatisticsService	statService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<EndedGame> getLeaderBoard(Principal principal, @RequestParam("page") int page, @RequestParam("size") int size)
	{
		return statService.getLeaderBoard(page, size);
	}
	/*
	@RequestMapping(value="/user", method = RequestMethod.GET)
	public Page<EndedGame> getGamesOfUser(Principal principal, @RequestParam("page") int page,  @RequestParam("size") int size){
		return statService.getGamesOfUser(principal.getName(), page, size);
	}
	*/
}
