package com.spring.spring.security.Service;

import com.spring.spring.security.Model.User;
import com.spring.spring.security.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {


    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User registerUser(User user)
    {
        user.setPassword(encoder.encode(user.getPassword()));  //password eka encode karanawa hash password ekak widihata
        return userRepo.save(user);
    }

    public String verify(User user) {
       Authentication authentication =
               authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

       if (authentication.isAuthenticated()) {
           return jwtService.generateToken(user.getUsername(),user.getRole());
       }
       else
       {
           return "fail";
       }
    }
}
