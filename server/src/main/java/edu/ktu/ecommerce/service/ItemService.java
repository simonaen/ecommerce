package edu.ktu.ecommerce.service;

import edu.ktu.ecommerce.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.ktu.ecommerce.entity.Item;

import java.util.List;

import javax.transaction.Transactional;

@Service
@Transactional
public class ItemService {
    private ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
}