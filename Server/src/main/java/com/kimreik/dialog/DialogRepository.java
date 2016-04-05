package com.kimreik.dialog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DialogRepository extends JpaRepository<Dialog, Integer>, DialogRepositoryCustom
{

}
