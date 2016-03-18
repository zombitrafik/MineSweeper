package com.kimreik.dialog;

import java.util.List;

public interface DialogRepositoryCustom
{
	List<DialogDTO> findDialogsOfUser(String username);

	Dialog findDialog(String user1, String user2);
}
