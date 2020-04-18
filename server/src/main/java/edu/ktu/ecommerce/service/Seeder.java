package edu.ktu.ecommerce.service;

import java.io.IOException;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import edu.ktu.ecommerce.entity.Brand;
import edu.ktu.ecommerce.entity.Color;
import edu.ktu.ecommerce.entity.ItemCategory;
import edu.ktu.ecommerce.repository.BrandRepository;
import edu.ktu.ecommerce.repository.ColorRepository;
import edu.ktu.ecommerce.repository.ItemCategoryRepository;
import edu.ktu.ecommerce.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class Seeder {

    final ObjectMapper mapper = new ObjectMapper();

    @PersistenceContext
    private EntityManager em;

    @Value("classpath:db/seed/brand.json")
    private Resource brandFile;
    private BrandRepository brandRepository;

    @Value("classpath:db/seed/color.json")
    private Resource colorFile;
    private ColorRepository colorRepository;

    @Value("classpath:db/seed/category.json")
    private Resource itemCategoryFile;
    private ItemCategoryRepository itemCategoryRepository;

    private ItemRepository itemRepository;

    public Seeder(BrandRepository brandRepository, ColorRepository colorRepository,
            ItemCategoryRepository itemCategoryRepository, ItemRepository itemRepository) {
        this.brandRepository = brandRepository;
        this.colorRepository = colorRepository;
        this.itemCategoryRepository = itemCategoryRepository;
        this.itemRepository = itemRepository;
    }

    public void seed() throws JsonParseException, JsonMappingException, IOException {
        // Seeding calls should be topologically sorted based on relations
        seedBrands();
        seedColors();
        seedCategories();
        seedItems();
    }

    private void seedItems() {
        // if (itemRepository.count() > 0) {
        //     return;
        // }
        // log.info("No item categories. Seeding item categories");
        // ItemCategory[] itemCategories = mapper.readValue(itemCategoryFile.getFile(), ItemCategory[].class);
    }

    private void seedCategories() throws JsonParseException, JsonMappingException, IOException {
        if (itemCategoryRepository.count() > 0) {
            return;
        }
        log.info("No item categories. Seeding item categories");
        ItemCategory[] itemCategories = mapper.readValue(itemCategoryFile.getFile(), ItemCategory[].class);
        for (ItemCategory category : itemCategories) {

            var match = em.createQuery(
                    "select u from ItemCategory u where u.gender = ?1 and u.mainCategory = ?2 and u.subCategory = ?3")
                    .setParameter(1, category.getGender()).setParameter(2, category.getMainCategory())
                    .setParameter(3, category.getSubCategory()).getFirstResult();

            if (match > 0) {
                itemCategoryRepository.saveAndFlush(category);
            }
        }
    }

    private void seedColors() throws JsonParseException, JsonMappingException, IOException {
        if (colorRepository.count() > 0) {
            return;
        }
        log.info("No colors. Seeding colors");
        Color[] colors = mapper.readValue(colorFile.getFile(), Color[].class);
        for (Color color : colors) {
            Optional<Color> newColor = colorRepository.findFirstByName(color.getName());
            if (!newColor.isPresent()) {
                colorRepository.saveAndFlush(color);
            }
        }
    }

    private void seedBrands() throws JsonParseException, JsonMappingException, IOException {
        if (brandRepository.count() > 0) {
            return;
        }
        log.info("No brands. Seeding brands.");
        Brand[] brands = mapper.readValue(brandFile.getFile(), Brand[].class);
        for (Brand brand : brands) {
            Optional<Brand> newBrand = brandRepository.findFirstByName(brand.getName());
            if (!newBrand.isPresent()) {
                brandRepository.saveAndFlush(brand);
            }
        }
    }
}