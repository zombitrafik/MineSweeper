package com.kimreik.dialog;

import java.util.List;

public interface DialogRepositoryCustom {
	public List<DialogDTO> findDialogsOfUser(String username);
	public Dialog findDialog(String user1, String user2);
}
