package edu.ktu.ecommerce;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import edu.ktu.ecommerce.service.Seeder;

@SpringBootApplication
public class EcommerceApplication {

    // private static final Logger log =
    //         LoggerFactory.getLogger(EcommerceApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

   @Bean
   public CommandLineRunner initialSeeder(Seeder seeder) {
       return (args) -> {
           seeder.seed();
       };
   }
}
