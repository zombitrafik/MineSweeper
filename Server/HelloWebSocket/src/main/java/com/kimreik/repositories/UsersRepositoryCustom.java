package com.kimreik.repositories;

import java.util.List;

import com.kimreik.model.User;

public interface UsersRepositoryCustom {
	public List<User> findByName(String username);
	public List<User> findOnline();
}
