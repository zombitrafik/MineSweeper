package com.kimreik.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kimreik.repositories.UserRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

	@Autowired
	UserRepository userRepo;
	
	
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.kimreik.model.User user = userRepo.findOne(username);
		if(user==null){
			throw new UsernameNotFoundException("user name not found");
		}
		return buildUserFromUserEntity(user);
	}
	
	private User buildUserFromUserEntity(com.kimreik.model.User user){
		String username = user.getUsername();
		String password = user.getPassword();
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		authList.add(new SimpleGrantedAuthority(user.getRole()));

		User springUser = new User(username, password, enabled,
				accountNonExpired, credentialsNonExpired, accountNonLocked,
				authList);
		return springUser;
	}

}
