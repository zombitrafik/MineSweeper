package com.kimreik.repositories;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.kimreik.model.User;

public class UsersRepositoryImpl implements UsersRepositoryCustom {
	
	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	public List<User> find(String username) {
		return this.entityManager
				.createQuery("select user from User user where user.username like '%"+username+"%'")
				.getResultList();
	}
}