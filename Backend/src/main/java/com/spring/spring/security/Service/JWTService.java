package com.spring.spring.security.Service;

import com.spring.spring.security.Model.User;
import com.spring.spring.security.Model.enums.Roles;
import com.spring.spring.security.Repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

private String secretKey = "";

    @Autowired
    private UserRepo userRepo;
    public JWTService() {

        try {
            KeyGenerator keygen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keygen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(keygen.generateKey().getEncoded());
        }

        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }


    public String generateToken(String username,Roles role) {

        // Fetch the user from DB
        User user = userRepo.findByusername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        // Get role from DB
         role = user.getRole();

        // Add role to JWT claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) // 1 hour
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
       byte[] encodedKey = Decoders.BASE64.decode(secretKey);
       return Keys.hmacShaKeyFor(encodedKey);
    }



    public String extractUsername(String jwtToken) {

        return extractClaims(jwtToken, Claims::getSubject);
    }

    public String extractUserRole(String jwtToken) {
        return extractClaims(jwtToken, claims -> claims.get("role", String.class));
    }

    private <T> T extractClaims(String jwtToken, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String jwtToken) {

        return Jwts.parser().verifyWith(getKey())
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload();
    }

    public boolean validateToken(String jwtToken, UserDetails userDetails) {
      final String username = extractUsername(jwtToken);
      return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken));
    }

    private boolean isTokenExpired(String jwtToken) {

        return extractExpiration(jwtToken).before(new Date());
    }


    private Date extractExpiration(String jwtToken) {

        return extractClaims(jwtToken, Claims::getExpiration);
    }
}
