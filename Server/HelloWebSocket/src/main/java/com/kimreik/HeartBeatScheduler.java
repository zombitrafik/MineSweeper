package com.kimreik;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.kimreik.services.SocketMessagingService;
import com.kimreik.user.User;
import com.kimreik.user.UserStatus;
import com.kimreik.user.UsersRepository;

@Component
public class HeartBeatScheduler {

	
	@Autowired UsersRepository usersRepo;
	
	@Autowired SocketMessagingService socketMessagingService;
	
	Logger logger = Logger.getLogger(HeartBeatScheduler.class);
	
	@Scheduled(fixedRate = 1000)
    public void reportCurrentTime() {
		List<User> onlineUsers = usersRepo.findOnline();
        long now = System.currentTimeMillis();
        for(User user : onlineUsers){
        	if(now-user.getLastHeartBeat()>3000){
        		logger.error(user.getUsername()+">3000");
        		user.setStatus(UserStatus.OFFLINE);
        		//disconnect;
        		continue;
        	}
        	if(now-user.getLastActivity()>600000){
        		logger.error(user.getUsername()+"_timeOut");
        		//disconnect
        		user.setStatus(UserStatus.OFFLINE);
        		continue;
        	}
        	if(now-user.getLastActivity()>120000){
        		//logger.error(user.getUsername()+"_AFK");
        		user.setStatus(UserStatus.AFK);
        		continue;
        	}
        }
        usersRepo.save(onlineUsers);
        socketMessagingService.sendHeartbeat();
    }
	
}
