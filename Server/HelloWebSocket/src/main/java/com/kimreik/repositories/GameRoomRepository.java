package com.kimreik.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kimreik.room.Room;

public interface GameRoomRepository extends JpaRepository<Room, Integer>{

}
