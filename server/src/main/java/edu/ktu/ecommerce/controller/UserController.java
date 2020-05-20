package edu.ktu.ecommerce.controller;

import edu.ktu.ecommerce.exception.auth.InvalidRefreshTokenException;
import edu.ktu.ecommerce.exception.auth.UserExistException;
import edu.ktu.ecommerce.model.auth.LoginRequest;
import edu.ktu.ecommerce.model.auth.RefreshTokenRequest;
import edu.ktu.ecommerce.model.auth.RegisterRequest;
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
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) throws UserExistException {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody @Valid RefreshTokenRequest tokenRequest) {
        var token = userService.refreshToken(tokenRequest.getRefreshToken())
                .orElseThrow(InvalidRefreshTokenException::new);

        return ResponseEntity.ok(token);
    }
}
