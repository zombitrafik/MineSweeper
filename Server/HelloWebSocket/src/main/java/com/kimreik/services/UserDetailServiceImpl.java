package com.kimreik.services;

import com.kimreik.user.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailsService
{

	@Autowired
	UsersRepository	userRepo;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
	{
		com.kimreik.user.User user = userRepo.findOne(username);
		if (user == null)
		{
			throw new UsernameNotFoundException("user name not found");
		}
		return buildUserFromUserEntity(user);
	}

	private User buildUserFromUserEntity(com.kimreik.user.User user)
	{
		String username = user.getUsername();
		String password = user.getPassword();
		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		List<GrantedAuthority> authList = new ArrayList<>();
		authList.add(new SimpleGrantedAuthority(user.getRole()));

		return new User(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authList);
	}

}
