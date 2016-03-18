package com.kimreik.services;

import com.kimreik.dialog.Dialog;
import com.kimreik.dialog.DialogRepository;
import com.kimreik.dialog.PrivateMessage;
import com.kimreik.helpers.ResponseMessage;
import com.kimreik.helpers.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ChatServiceImpl implements ChatService
{

	@Autowired
	SocketMessagingService	socketMessagingService;

	@Autowired
	DialogRepository		dialogRepo;

	@Transactional
	public void sendMessage(String sender, PrivateMessage message)
	{

		message.setSender(sender);
		String recipient = message.getRecipient();

		// TODO: ���� ���� ���� ������ ��� ������� ��� ���� ����.
		boolean recipientOnline = true; // TODO ��������

		if (recipientOnline)
		{
			Dialog dialog = dialogRepo.findDialog(sender, recipient);
			if (dialog == null)
			{
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
		}
		else
		{
			// send error to sender
		}

	}

	public ResponseEntity<?> getDialogs(String username)
	{
		ResponseMessage message = ResponseMessage.DIALOGS;
		message.add("dialogs", dialogRepo.findDialogsOfUser(username));
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

	public ResponseEntity<?> getDialog(String user1, String user2)
	{
		ResponseMessage message = ResponseMessage.DIALOG;
		message.add("dialog", dialogRepo.findDialog(user1, user2));
		return ResponseWrapper.wrap(message, HttpStatus.OK);
	}

}
