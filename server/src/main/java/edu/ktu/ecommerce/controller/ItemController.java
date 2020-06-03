package edu.ktu.ecommerce.controller;

import edu.ktu.ecommerce.entity.Item;
import edu.ktu.ecommerce.model.ItemModel;
import edu.ktu.ecommerce.service.ItemService;
import edu.ktu.ecommerce.service.impl.ItemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping(path = "/api/item")
@ResponseBody
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemServiceImpl itemService) {
        this.itemService = itemService;
    }

    @GetMapping("")
    public ResponseEntity<List<Item>> getItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemModel> getItem(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }
}
