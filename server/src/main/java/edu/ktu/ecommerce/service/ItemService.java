package edu.ktu.ecommerce.service;

import edu.ktu.ecommerce.model.ItemModel;
import edu.ktu.ecommerce.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.ktu.ecommerce.entity.Item;

import java.util.List;

import javax.transaction.Transactional;

@Service
@Transactional
public interface ItemService {

    List<Item> getAllItems();

    ItemModel getItemById(Long id);
}
