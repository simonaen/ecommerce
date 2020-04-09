package edu.ktu.ecommerce;

import edu.ktu.ecommerce.entity.Item;
import edu.ktu.ecommerce.repository.ItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EcommerceApplication {

    private static final Logger log =
            LoggerFactory.getLogger(EcommerceApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }

    @Bean
    public CommandLineRunner seeder(ItemRepository itemRepository) {
        return (args) -> {
            if (itemRepository.count() == 0) {
                log.info("Seeded two items");
            }
        };
    }
}
