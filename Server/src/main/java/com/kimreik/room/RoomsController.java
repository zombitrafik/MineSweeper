package com.kimreik.room;

import com.kimreik.game.GameService;
import com.kimreik.game.Player;
import com.kimreik.game.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomsController
{

	@Autowired
	private RoomsService	roomsService;

	@Autowired
	private GameService		gameService;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> createRoom(Principal principal, @RequestBody RoomDTO roomDTO, BindingResult result)
	{
		return roomsService.createRoom(principal.getName(), roomDTO, result);
	}

	@RequestMapping(value = "/start", method = RequestMethod.POST)
	public void startGame(Principal principal)
	{
		roomsService.startGame(principal.getName());
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> getRooms(Principal principal)
	{
		return roomsService.getRooms(principal.getName());
	}

	@RequestMapping(value = "/current", method = RequestMethod.GET)
	public Room getCurrentRoom(Principal principal)
	{
		return roomsService.getCurrentRoom(principal.getName());
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public ResponseEntity<?> joinRoom(Principal principal, @PathVariable Integer id)
	{
		return roomsService.joinRoom(id, principal.getName());
	}

	@RequestMapping(value = "/testClick", method = RequestMethod.POST)
	public ResponseEntity<?> handleClick(Principal principal, @RequestBody Point point)
	{
		return gameService.handleGameClick(principal.getName(), point);
	}

	@RequestMapping(value = "/testRightClick", method = RequestMethod.POST)
	public ResponseEntity<?> handleRightClick(Principal principal, @RequestBody Point point)
	{
		return gameService.handleGameRightClick(principal.getName(), point);
	}

	@RequestMapping(value = "/leave", method = RequestMethod.POST)
	public void leaveRoom(Principal principal)
	{
		roomsService.leaveRoom(principal.getName());
	}

	@RequestMapping(value = "/next", method = RequestMethod.POST)
	public int nextRoom(Principal principal)
	{
		return roomsService.nextRoom(principal.getName());
	}

	@RequestMapping(value = "/message", method = RequestMethod.POST)
	public void sendMessage(Principal principal, @RequestBody String message)
	{
		roomsService.sendMessage(principal.getName(), message);
	}

	@RequestMapping(value = "/stat", method = RequestMethod.GET)
	public List<Player> getStat(Principal principal)
	{
		return gameService.getStatistics(principal.getName());
	}

	@RequestMapping(value = "/invite", method = RequestMethod.POST)
	public void invitePlayer(Principal principal, @RequestBody String invitedPlayerName)
	{
		roomsService.invitePlayer(principal.getName(), invitedPlayerName);
	}

	public void kickPlayer(Principal principal, @RequestBody String kickedPlayerName){
		roomsService.kickPlayer(principal.getName(), kickedPlayerName);
	}
}
