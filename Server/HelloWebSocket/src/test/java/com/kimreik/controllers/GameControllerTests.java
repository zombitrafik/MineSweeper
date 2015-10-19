package com.kimreik.controllers;

import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.SpringApplicationContextLoader;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.specification.RequestSpecification;
import com.kimreik.Application;
import com.kimreik.model.User;
import com.kimreik.repositories.UserRepository;
import com.kimreik.security.SecurityConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader = SpringApplicationContextLoader.class, classes = {Application.class, SecurityConfiguration.class})
@WebIntegrationTest(randomPort=true)

public class GameControllerTests {

	@Value("${local.server.port}")
	private int port;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	RequestSpecification authentication;
	
	@Before
	public void setUp() {
		
		User user = new User();
		user.setUsername("user");
		user.setPassword(passwordEncoder.encode("password"));
		user.setEnabled(true);
		user.setRole("ROLE_USER");
		userRepo.saveAndFlush(user);
		
	    RestAssured.port = port;
	    authentication = RestAssured.given().auth().basic("user", "password");
	}
	
	@Test
	public void fastExplore() throws Exception{
		int x=1;
		int y=1;
		
		authentication.expect()
			.statusCode(200)
		.when()
			.post("/lobby/createRoom")
		.then()
			.statusCode(200);
		
		authentication.given()
			.body(x)
			.body(y)
			.contentType(ContentType.JSON)
		.when()
			.post("/lobby/testClick/1")
		.then()
			.statusCode(200)
			.body("x", Matchers.hasSize(20));
		
		x=3;
		y=2;
		
		authentication.given()
			.body(x)
			.body(y)
			.contentType(ContentType.JSON)
		.when()
			.post("/lobby/testRightClick/1")
		.then()
			.statusCode(200);
		
		x=2;
		
		authentication.given()
			.body(x)
			.body(y)
			.contentType(ContentType.JSON)
		.when()
			.post("/lobby/testClick/1")
		.then()
			.statusCode(200)
			.body("x", Matchers.equalTo(3))
			.body("y", Matchers.equalTo(3));
		
	}
	
}
