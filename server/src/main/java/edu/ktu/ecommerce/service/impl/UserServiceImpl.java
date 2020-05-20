package edu.ktu.ecommerce.service.impl;

import edu.ktu.ecommerce.entity.AppUser;
import edu.ktu.ecommerce.entity.UserRefreshToken;
import edu.ktu.ecommerce.exception.auth.UserExistException;
import edu.ktu.ecommerce.model.auth.LoginRequest;
import edu.ktu.ecommerce.model.auth.LoginResponse;
import edu.ktu.ecommerce.model.auth.RefreshToken;
import edu.ktu.ecommerce.model.auth.RegisterRequest;
import edu.ktu.ecommerce.repository.UserRefreshTokenRepository;
import edu.ktu.ecommerce.repository.UserRepository;
import edu.ktu.ecommerce.security.JwtUtil;
import edu.ktu.ecommerce.security.UserDetailsServiceImpl;
import edu.ktu.ecommerce.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepository userRepository;
    private final UserRefreshTokenRepository refreshTokenRepository;

    public UserServiceImpl(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            PasswordEncoder passwordEncoder,
            UserDetailsServiceImpl userDetailsService,
            UserRepository userRepository, UserRefreshTokenRepository refreshTokenRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws AuthenticationException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        return LoginResponse.of(
                generateToken(loginRequest.getEmail()),
                createRefreshToken(loginRequest.getEmail())
        );
    }

    @Override
    public LoginResponse register(RegisterRequest registerRequest) throws UserExistException {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserExistException("Email is used");
        }
        var user = new AppUser();
        user.setEmail(registerRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);

        // After successful registration, generate jwt
        // TODO: register method should not be responsible for login in??

        var loginRequest = LoginRequest.builder()
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .build();

        return login(loginRequest);
    }

    @Override
    public Optional<RefreshToken> refreshToken(String token) {
        return this.refreshTokenRepository.findByToken(token)
                .map(userRefreshToken -> generateToken(userRefreshToken.getUser().getEmail()))
                .map(RefreshToken::new);
    }

    private String generateToken(String email) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        return jwtUtil.generateToken(userDetails);
    }

    private String createRefreshToken(String email) {
        String tokenValue = RandomStringUtils.randomAlphanumeric(128);
        var user = userRepository.getByEmail(email).orElseThrow();
        var token = UserRefreshToken.builder()
                .token(tokenValue).user(user)
                .build();

        refreshTokenRepository.save(token);
        return tokenValue;
    }
}
