package com.sofi.rest.webservices.restfulwebservices.basic.auth;

import org.springframework.http.HttpStatus;

public class AuthenticationBean {
	
	private String message;

	public AuthenticationBean(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "HelloWorldBean [message=" + message + "]";
	}

	public static Object status(HttpStatus internalServerError) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	

}