package com.kimreik;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.kimreik.model.User;
import com.kimreik.model.UserStatus;
import com.kimreik.repositories.UsersRepository;
import com.kimreik.services.SocketMessagingService;

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
        	if(now-user.getLastActivity()>60000/*600000*/){
        		logger.error(user.getUsername()+"_timeOut");
        		//disconnect
        		
        		continue;
        	}
        	if(now-user.getLastActivity()>10000/*120000*/){
        		logger.error(user.getUsername()+"_AFK");
        		user.setStatus(UserStatus.AFK);
        		continue;
        	}
        }
        usersRepo.save(onlineUsers);
        socketMessagingService.sendHeartbeat();
    }
	
}
