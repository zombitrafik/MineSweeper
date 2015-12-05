package com.kimreik.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kimreik.dialog.Dialog;
import com.kimreik.dialog.DialogDTO;
import com.kimreik.dialog.DialogRepository;
import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import com.kimreik.model.PrivateMessage;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	SocketMessagingService socketMessagingService;
	
	@Autowired
	DialogRepository dialogRepo;
	
	public void sendMessage(String sender, PrivateMessage message) {

		message.setSender(sender);
		String recipient = message.getRecipient();
		
		// TODO: егор если юзер офлайн или игнорит или типа того.
		boolean recipientOnline = true; // TODO заглушка

		if (recipientOnline) {
			Dialog dialog = dialogRepo.findDialog(sender, recipient);
			if(dialog==null){
				dialog = new Dialog();
				dialog.setId(null);
				dialog.setUser1(sender);
				dialog.setUser2(recipient);
			}
			dialog.addMessage(message);
			dialogRepo.save(dialog);
			ResponseMessage respMessage = ResponseMessage.PRIVATE_MESSAGE.add("message", message);
			socketMessagingService.sendPrivateMessage(recipient, respMessage);
			socketMessagingService.sendPrivateMessage(sender, respMessage);
		} else {
			// send error to sender
		}

	}

	public ResponseEntity<?> getDialogs(String username) {
		
		return ResponseWrapper.wrap(dialogRepo.findDialogsOfUser(username), HttpStatus.OK);
	}

	public ResponseEntity<?> getDialog(String user1, String user2) {
		return ResponseWrapper.wrap(dialogRepo.findDialog(user1,user2), HttpStatus.OK);
	}

}
