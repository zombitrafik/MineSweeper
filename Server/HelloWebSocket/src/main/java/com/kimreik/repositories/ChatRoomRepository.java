package com.kimreik.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kimreik.model.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

}
