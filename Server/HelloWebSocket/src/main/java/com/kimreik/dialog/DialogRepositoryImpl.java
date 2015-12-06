package com.kimreik.dialog;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;

public class DialogRepositoryImpl implements DialogRepositoryCustom{

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	public List<DialogDTO> findDialogsOfUser(String username) {
		
		List<Object[]> list = this.entityManager
				.createQuery("select dialog.user1, dialog.user2, dialog.lastMessage from Dialog dialog where dialog.user1 = '"+username+"' OR dialog.user2 = '"+username+"'")
				.getResultList();
		List<DialogDTO> result = new ArrayList<DialogDTO>();
		for(Object[] obj : list){
			DialogDTO dialog = new DialogDTO();
			String opponent = obj[1].equals(username)?(String)obj[0]:(String)obj[1];
			dialog.setUsername(opponent);
			dialog.setLastMessage((PrivateMessage)obj[2]);
			result.add(dialog);
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public Dialog findDialog(String user1, String user2) {
		List<Dialog> dialogs = this.entityManager
				.createQuery("select dialog from Dialog dialog where (dialog.user1 = '"+user1+"' AND dialog.user2 = '"+user2+"') OR (dialog.user1 = '"+user2+"' AND dialog.user2 = '"+user1+"')")
				.getResultList();
		if(dialogs.size()!=0){
			return (Dialog)dialogs.get(0);
			 //мб говнокод.
		}else{
			return null;
		}
	}

}
