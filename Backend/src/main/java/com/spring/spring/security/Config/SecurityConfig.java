package com.spring.spring.security.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration  //meken karanne meka configuration class ekk kiyala kiyana eka
@EnableWebSecurity //meken defalut setting ayin karala me class eke kiyala tiyana widihada config wena eka
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
         http.csrf(customizer -> customizer.disable());//csrf token eka disable kala mokada hama parama session id eka wenas wena hinda awlk naa eka disable kalata
         http.authorizeHttpRequests(request -> request.requestMatchers("register","login")
                 .permitAll().anyRequest().authenticated());
         //http.formLogin(Customizer.withDefaults()); //meken thamai ara default login form eka ganne eka one nh comment karala tiyenne postman eken log wenna puluwan
         http.httpBasic(Customizer.withDefaults());//postman wage ekakin log wena eka unable karanne meken
         http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));//session eka statless karanne meken
       http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

//    @Bean
//    public UserDetailsService userDetailsService() {
//
//        UserDetails user = User
//                .withDefaultPasswordEncoder()
//                .username("uthpala")
//                .password("sajana@123")
//                .roles("USER")                                 //database eken nathuwa nikn default username,password,role set karana widiha
//                .build();
//
//        UserDetails user2 = User
//                .withDefaultPasswordEncoder()
//                .username("yasas")
//                .password("yasas@123")
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(user, user2);
//    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider Provider = new DaoAuthenticationProvider();
//        Provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance()); //password encoder eka disable karanawa...plan text eka pennanne password ekata encode wenne naa
        Provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        Provider.setUserDetailsService(userDetailsService);
        return Provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();


    }
}
