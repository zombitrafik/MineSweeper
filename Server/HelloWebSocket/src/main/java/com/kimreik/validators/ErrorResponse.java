package com.kimreik.validators;

public class ErrorResponse {

	public static final ErrorResponse NOT_JOINED_TO_ROOM = new ErrorResponse("NOT_JOINED_TO_ROOM");
	public static final ErrorResponse USER_ALREADY_IN_SOME_ROOM = new ErrorResponse("USER_ALREADY_IN_SOME_ROOM");
	
	public static final ErrorResponse USERNAME_ALREADY_EXIST = new ErrorResponse("USERNAME_ALREADY_EXIST");
	public static final ErrorResponse PASSWORDS_DONT_MATCH = new ErrorResponse("PASSWORDS_DONT_MATCH");
	
	private String message;

	public ErrorResponse(String message) {
		this.message = message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
}
