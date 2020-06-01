package edu.ktu.ecommerce.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ktu.ecommerce.exception.RestExceptionHandler;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final RestExceptionHandler exceptionHandler;
    private final ObjectMapper mapper;

    public JwtRequestFilter(UserDetailsService userDetailsService, JwtUtil jwtUtil, RestExceptionHandler exceptionHandler, ObjectMapper mapper) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.exceptionHandler = exceptionHandler;
        this.mapper = mapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
        }

        try {
            username = jwtUtil.extractUsername(jwt);
        } catch (ExpiredJwtException e) {
            var errorResponseEntity = exceptionHandler.handleExpiredJwt(e);
            response.setStatus(errorResponseEntity.getStatusCodeValue());
            response.setContentType("application/json");
            response.getOutputStream().print(
                    mapper.writeValueAsString(errorResponseEntity.getBody())
            );
            return;
        } catch (SignatureException e) {
            var errorResponseEntity = exceptionHandler.handleSignatureException(e);
            response.setStatus(errorResponseEntity.getStatusCodeValue());
            response.setContentType("application/json");
            response.getOutputStream().print(
                    mapper.writeValueAsString(errorResponseEntity.getBody())
            );
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {

                var usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }

}
