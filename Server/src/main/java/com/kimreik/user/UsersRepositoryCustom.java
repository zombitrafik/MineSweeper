package com.kimreik.user;

import java.util.List;

public interface UsersRepositoryCustom
{
	List<User> findByName(String username);

	List<User> findOnline();
}
