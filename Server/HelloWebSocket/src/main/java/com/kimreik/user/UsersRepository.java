package com.kimreik.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, String>, UsersRepositoryCustom{

}
