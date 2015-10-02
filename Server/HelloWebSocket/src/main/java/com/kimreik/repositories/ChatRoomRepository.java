package com.kimreik.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kimreik.model.GameRoom;

public interface ChatRoomRepository extends JpaRepository<GameRoom, String> {

}
