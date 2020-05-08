package edu.ktu.ecommerce.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ktu.ecommerce.entity.*;
import edu.ktu.ecommerce.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.IOException;
import java.util.Optional;

@Service
@Slf4j
public class Seeder {

    final ObjectMapper mapper = new ObjectMapper();

    @PersistenceContext
    private EntityManager em;

    @Value("classpath:db/seed/brand.json")
    private Resource brandFile;
    private final BrandRepository brandRepository;

    @Value("classpath:db/seed/color.json")
    private Resource colorFile;
    private final ColorRepository colorRepository;

    @Value("classpath:db/seed/category.json")
    private Resource itemCategoryFile;
    private final ItemCategoryRepository itemCategoryRepository;

    private final SizeRepository sizeRepository;
    private final ItemVarietyRepository itemVarietyRepository;
    private final ImageRepository imageRepository;

    @Value("classpath:db/seed/item.json")
    private Resource itemFile;
    private final ItemRepository itemRepository;

    public Seeder(BrandRepository brandRepository, ColorRepository colorRepository,
                  ItemCategoryRepository itemCategoryRepository, ItemRepository itemRepository,
                  SizeRepository sizeRepository, ItemVarietyRepository itemVarietyRepository,
                  ImageRepository imageRepository) {
        this.brandRepository = brandRepository;
        this.colorRepository = colorRepository;
        this.itemCategoryRepository = itemCategoryRepository;
        this.itemRepository = itemRepository;
        this.sizeRepository = sizeRepository;
        this.itemVarietyRepository = itemVarietyRepository;
        this.imageRepository = imageRepository;
    }

    public void seed() throws IOException {
        // Seeding calls should be topologically sorted based on relations
        seedBrands();
        seedColors();
        seedCategories();
        seedSizes();
        seedItems();
    }

    private void seedSizes() throws IOException {
        if (sizeRepository.count() > 0) {
            return;
        }
        log.info("No sizes. Seeding sizes");
        var sizes = mapper.readValue(ResourceUtils.getFile("classpath:db/seed/sizes.json"), Size[].class);
        for (Size size : sizes) {
            var match = sizeRepository.findByValueAndSizeCategory(size.getValue(), size.getSizeCategory());
            if (match.isEmpty()) {
                sizeRepository.saveAndFlush(size);
            }
        }
    }

    private void seedItems() throws IOException {
        if (itemRepository.count() > 0) {
            return;
        }
        log.info("No items. Seeding items");
        var items = mapper.readValue(itemFile.getFile(), Item[].class);
        for (var item : items) {
            // Get brand
            var brand = brandRepository.findFirstByName(item.getBrand().getName());
            if (brand.isEmpty()) {
                throw new IllegalStateException("Can't create item because brand with name \"" +
                        item.getBrand().getName() +
                        "\" does not exist.");
            }
            // Get color
            var color = colorRepository.findFirstByName(item.getColor().getName());
            if (color.isEmpty()) {
                throw new IllegalStateException("Can't create item because color with name \"" +
                        item.getColor().getName() +
                        "\" does not exist.");
            }
            // Get category
            if (item.getCategory().getGender() == null) {
                item.getCategory().setGender("unisex");
            }
            var category = findFirstCategoryByAllAttributes(item.getCategory());
            if (category.isEmpty()) {
                throw new IllegalStateException("Can't create item because category with gender \"" +
                        item.getCategory().getGender() +
                        "\", main category \"" +
                        item.getCategory().getMainCategory() +
                        "\" and sub category \"" +
                        item.getCategory().getSubCategory() +
                        "\" does not exist.");
            }

            // Add attributes to item
            item.setBrand(brand.get());
            item.setColor(color.get());
            item.setCategory(category.get());

            // Save
            var itemVarieties = item.getItemVarieties();
            var itemImages = item.getImages();
            item.setImages(null);
            item.setItemVarieties(null);
            itemRepository.save(item);

            // Create item varieties
            for (var itemVariety : itemVarieties) {
                // Get persisted size
                var size = itemVariety.getSize();
                Optional<Size> persistedSize =
                        sizeRepository.findByValueAndSizeCategory(size.getValue(), size.getSizeCategory())
                                .stream()
                                .findFirst();
                if (persistedSize.isEmpty()) {
                    throw new IllegalStateException("Size " + size.getValue() + " does not exist");
                }
                itemVariety.setSize(persistedSize.get());
                itemVariety.setItem(item);
                itemVarietyRepository.saveAndFlush(itemVariety);
            }
            item.setItemVarieties(itemVarieties);

            // Create item images
            itemImages.forEach(image -> image.setItem(item));
            imageRepository.saveAll(itemImages);

            itemRepository.saveAndFlush(item);
        }
        log.info("Seeding items completed");
    }

    private void seedCategories() throws IOException {
        if (itemCategoryRepository.count() > 0) {
            return;
        }
        log.info("No item categories. Seeding item categories");
        ItemCategory[] itemCategories = mapper.readValue(itemCategoryFile.getFile(), ItemCategory[].class);
        for (ItemCategory category : itemCategories) {

            if (category.getGender() == null) {
                category.setGender("unisex");
            }

            var match = findFirstCategoryByAllAttributes(category);

            if (match.isEmpty()) {
                itemCategoryRepository.saveAndFlush(category);
            }
        }
    }

    private void seedColors() throws IOException {
        if (colorRepository.count() > 0) {
            return;
        }
        log.info("No colors. Seeding colors");
        Color[] colors = mapper.readValue(colorFile.getFile(), Color[].class);
        for (Color color : colors) {
            Optional<Color> newColor = colorRepository.findFirstByName(color.getName());
            if (newColor.isEmpty()) {
                colorRepository.saveAndFlush(color);
            }
        }
    }

    private void seedBrands() throws IOException {
        if (brandRepository.count() > 0) {
            return;
        }
        log.info("No brands. Seeding brands.");
        Brand[] brands = mapper.readValue(brandFile.getFile(), Brand[].class);
        for (Brand brand : brands) {
            Optional<Brand> newBrand = brandRepository.findFirstByName(brand.getName());
            if (newBrand.isEmpty()) {
                brandRepository.saveAndFlush(brand);
            }
        }
    }

    private Optional<ItemCategory> findFirstCategoryByAllAttributes(ItemCategory category) {
        return em.createQuery(
                "select u from ItemCategory u where u.gender = :gender and u.mainCategory = :mainCategory and u.subCategory = :subCategory",
                ItemCategory.class)
                .setParameter("gender", category.getGender())
                .setParameter("mainCategory", category.getMainCategory())
                .setParameter("subCategory", category.getSubCategory())
                .setMaxResults(1)
                .getResultList()
                .stream()
                .findFirst();
    }
}
