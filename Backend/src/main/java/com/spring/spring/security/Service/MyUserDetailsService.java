package com.spring.spring.security.Service;

import com.spring.spring.security.Model.User;
import com.spring.spring.security.Model.UserPrinciple;
import com.spring.spring.security.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByusername(username);

        if(user == null)
        {
            System.out.println("user not found");
            throw new UsernameNotFoundException("user not found");
        }


        return new UserPrinciple(user);
    }
}
