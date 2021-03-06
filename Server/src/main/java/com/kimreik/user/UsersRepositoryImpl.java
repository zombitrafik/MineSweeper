package com.kimreik.user;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class UsersRepositoryImpl implements UsersRepositoryCustom
{

	@PersistenceContext
	private EntityManager	entityManager;

	@SuppressWarnings("unchecked")
	public List<User> findByName(String username)
	{
		return this.entityManager.createQuery("select user from User user where user.username like '%" + username + "%'").getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<User> findOnline()
	{
		return this.entityManager.createQuery("select user from User user where user.status !='OFFLINE'").getResultList();
	}
}
