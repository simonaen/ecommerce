package edu.ktu.ecommerce.controller;

import edu.ktu.ecommerce.exception.UserExistException;
import edu.ktu.ecommerce.model.auth.RegisterRequest;
import edu.ktu.ecommerce.model.auth.LoginRequest;
import edu.ktu.ecommerce.model.auth.LoginResponse;
import edu.ktu.ecommerce.service.UserService;
import edu.ktu.ecommerce.service.impl.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) throws AuthenticationException {
        String jwt = userService.login(request);

        return ResponseEntity.ok(new LoginResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) throws UserExistException {
        userService.register(request);

        // After successful registration, generate jwt
        var loginRequest = LoginRequest.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        String jwt = userService.login(loginRequest);

        return ResponseEntity.ok(new LoginResponse(jwt));
    }
}
