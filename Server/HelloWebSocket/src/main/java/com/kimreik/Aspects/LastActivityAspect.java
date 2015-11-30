package com.kimreik.Aspects;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kimreik.model.User;
import com.kimreik.model.UserStatus;
import com.kimreik.repositories.UsersRepository;

@Aspect
@Component
public class LastActivityAspect {

	private Logger logger = Logger.getLogger(getClass());;

	@Autowired
	UsersRepository userRepo;

	@Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
	public void requestMapping() {
	}
	

	@Pointcut("@annotation(org.springframework.messaging.handler.annotation.MessageMapping)")
	public void messageMapping() {
	}
	
	@Pointcut("execution(* com.kimreik..*(..))")
	public void myPackages(){
	}
	
	@After("(requestMapping() || messageMapping()) && myPackages()")
	public void updateLastActivity(JoinPoint joinPoint){
		
		if (!(joinPoint.getArgs()[0] instanceof Principal)) {
			logger.error("principal not first at "+joinPoint.getSignature());
			return;
		}
		
		String username = ((Principal)joinPoint.getArgs()[0]).getName();
		User user = userRepo.findOne(username);
		
		user.setStatus(UserStatus.ONLINE);
		user.setLastActivity(System.currentTimeMillis());
		user.setLastHeartBeat(System.currentTimeMillis());
		userRepo.save(user);
		
		//return pjp.proceed();
	}
}