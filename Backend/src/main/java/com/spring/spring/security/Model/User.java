package com.spring.spring.security.Model;

import com.spring.spring.security.Model.enums.Roles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    @Column(name = "user_id", length = 45, nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;

    @Column(name = "username", length = 100, nullable = false)
    private String username;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 100, nullable = false)
    private Roles role  = Roles.USER ;
}
