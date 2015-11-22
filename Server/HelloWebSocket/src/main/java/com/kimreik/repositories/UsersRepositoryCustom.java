package com.kimreik.repositories;

import java.util.List;

import com.kimreik.model.User;

public interface UsersRepositoryCustom {
	public List<User> find(String username);
}
