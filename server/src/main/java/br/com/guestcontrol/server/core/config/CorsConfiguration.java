package br.com.erivelto.crudFuncionario.core.config;

import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Create by erivelto on 19/08/19
 */
@Configuration
public class CorsConfiguration implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        var response = (HttpServletResponse) servletResponse;
        var request = (HttpServletRequest) servletRequest;

        response.setHeader("Access-Control-Allow-Origin", "*");//restringe as origens de aplicação
        response.setHeader("Access-Control-Allow-Headers", "*");//restringe as variaveis no header
        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE, PATCH");//quais metodos será aceito
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");

        if (!"OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }

}
