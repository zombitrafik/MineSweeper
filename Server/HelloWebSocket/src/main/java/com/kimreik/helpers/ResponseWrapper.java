package com.kimreik.helpers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseWrapper {

	public static <T> ResponseEntity<T> wrap(T object, HttpStatus status){
		return new ResponseEntity<T>(object, status);
	}
	
}
