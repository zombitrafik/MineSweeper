package com.kimreik.user;

import java.util.List;

public interface UsersRepositoryCustom {
	public List<User> findByName(String username);
	public List<User> findOnline();
}
