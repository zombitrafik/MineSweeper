package com.kimreik.validators;

public class ErrorResponse {

	public static final String EMPTY_NAME="EMPTY_NAME";
	public static final String EMPLOYEES_COUNT="EMPLOYEES_COUNT";
	public static final String MANAGER="MANAGER";
	public static final String TELEPHONE="TELEPHONE";
	public static final String ORGANIZATION_TYPE="ORGANIZATION_TYPE";
	
	public static final String USERNAME_ALREADY_EXIST = "USERNAME_ALREADY_EXIST";
	public static final String PASSWORDS_DONT_MATCH = "PASSWORDS_DONT_MATCH";
	
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
