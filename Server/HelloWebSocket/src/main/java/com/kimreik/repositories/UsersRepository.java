package com.kimreik.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kimreik.model.User;

public interface UsersRepository extends JpaRepository<User, String>, UsersRepositoryCustom{

}
