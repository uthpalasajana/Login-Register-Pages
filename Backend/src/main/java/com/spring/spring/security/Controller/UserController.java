package com.spring.spring.security.Controller;

import com.spring.spring.security.Model.User;
import com.spring.spring.security.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

@PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {

    return userService.verify(user);
    }
}
