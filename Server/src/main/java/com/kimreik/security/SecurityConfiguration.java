package com.kimreik.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter
{

	@Autowired
	UserDetailsService	userDetailsService;

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception
	{

		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());

	}

	@Override
	protected void configure(HttpSecurity http) throws Exception
	{
		http.httpBasic()
				.and()
				.authorizeRequests()
				.antMatchers("/index.html", "/", "/components/**", "/styles/**", "/shared/**", "/images/**","/scripts/**","/fonts/**", "/bower_components/**", "/app.js",
						"/app-config.js", "/newUser").permitAll().anyRequest().authenticated().and().csrf().disable();
		/*csrfTokenRepository(csrfTokenRepository()).and()
		.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class);
		.and().logout()
			.logoutSuccessUrl("/")
			.logoutUrl("/logout")
			.deleteCookies("JSESSIONID")
		.and().csrf().disable();*/
		;
	}

	@Bean
	public PasswordEncoder passwordEncoder()
	{
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

	private CsrfTokenRepository csrfTokenRepository()
	{
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;
	}

}
