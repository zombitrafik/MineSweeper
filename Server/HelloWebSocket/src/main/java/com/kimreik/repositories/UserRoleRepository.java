package com.kimreik.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kimreik.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

}
