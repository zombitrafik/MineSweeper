package com.kimreik;

import com.kimreik.services.SocketMessagingService;
import com.kimreik.user.User;
import com.kimreik.user.UserStatus;
import com.kimreik.user.UsersRepository;
import com.kimreik.user.UsersService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HeartBeatScheduler
{

	@Autowired
	UsersRepository			usersRepo;

	@Autowired
	private UsersService	usersService;

	@Autowired
	SocketMessagingService	socketMessagingService;

	Logger					logger	= Logger.getLogger(HeartBeatScheduler.class);

	//@Scheduled(fixedRate = 1000)
	public void reportCurrentTime()
	{
		List<User> onlineUsers = usersRepo.findOnline();
		long now = System.currentTimeMillis();
		for (User user : onlineUsers)
		{
			if (now - user.getLastHeartBeat() > 3000 && !user.getStatus().equals(UserStatus.OFFLINE))
			{
				usersService.updateStatus(user.getUsername(), UserStatus.OFFLINE);
				//disconnect;
				continue;
			}
			if (now - user.getLastActivity() > 600000 && !user.getStatus().equals(UserStatus.OFFLINE))
			{
				//disconnect
				usersService.updateStatus(user.getUsername(), UserStatus.OFFLINE);
				continue;
			}
			if (now - user.getLastActivity() > 120000 && !user.getStatus().equals(UserStatus.AFK))
			{
				usersService.updateStatus(user.getUsername(), UserStatus.AFK);
				continue;
			}
			if (!user.getStatus().equals(UserStatus.ONLINE) && (now - user.getLastActivity() < 120000) && (now - user.getLastHeartBeat() < 3000))
			{
				usersService.updateStatus(user.getUsername(), UserStatus.ONLINE);
			}
		}
		usersRepo.save(onlineUsers);
		//socketMessagingService.sendHeartbeat();
	}

}
