package edu.ktu.ecommerce.service.impl;

import edu.ktu.ecommerce.entity.AppUser;
import edu.ktu.ecommerce.exception.UserExistException;
import edu.ktu.ecommerce.model.auth.LoginRequest;
import edu.ktu.ecommerce.model.auth.RegisterRequest;
import edu.ktu.ecommerce.repository.UserRepository;
import edu.ktu.ecommerce.security.JwtUtil;
import edu.ktu.ecommerce.security.UserDetailsServiceImpl;
import edu.ktu.ecommerce.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepository userRepository;

    public UserServiceImpl(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder,
            UserDetailsServiceImpl userDetailsService,
            UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }

    @Override
    public String login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

        return jwtUtil.generateToken(userDetails);
    }

    @Override
    public AppUser register(RegisterRequest registerRequest) throws UserExistException {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserExistException("Email is used");
        }
        var user = new AppUser();
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);
        return user;
    }
}
