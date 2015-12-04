package com.kimreik.repositories;

import java.util.List;

import com.kimreik.user.User;

public interface UsersRepositoryCustom {
	public List<User> findByName(String username);
	public List<User> findOnline();
}
