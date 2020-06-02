package edu.ktu.ecommerce.service.impl;

import edu.ktu.ecommerce.entity.Item;
import edu.ktu.ecommerce.entity.ItemVariety;
import edu.ktu.ecommerce.model.ItemModel;
import edu.ktu.ecommerce.model.ItemVarietyModel;
import edu.ktu.ecommerce.repository.ItemRepository;
import edu.ktu.ecommerce.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final ModelMapper mapper;

    public ItemServiceImpl(ItemRepository itemRepository, ModelMapper mapper) {
        this.itemRepository = itemRepository;
        this.mapper = mapper;
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public ItemModel getItemById(Long id) {
        Item item = this.itemRepository.findById(id).orElseThrow();
        mapper.typeMap(ItemVariety.class, ItemVarietyModel.class).addMapping(
                src -> src.getSize().getValue(),
                (model, value)  -> model.setSize(String.valueOf(value))
        );

        var itemModel = mapper.map(item, ItemModel.class);
        return itemModel;
    }
}
