package com.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dto.Book;

@RestController()
@RequestMapping("rest/books")
public class BookController {

	public static List<Book> books = new ArrayList<Book>();
	public static int idCounter = 1;

	@GetMapping("")
	public List<Book> getBookList() {
		return books;
	}
	
	@PostMapping(value = "/book", produces = "application/json", consumes = "application/json")
	public Book saveBook(@RequestBody Book book) throws Exception {
		if(!books.contains(book)) {
		book.setId("mb"+idCounter);
		books.add(book);
		idCounter = idCounter+1;
		}else {
			throw new Exception("Book Already Exist");
		}
		return book;
	}

	@GetMapping("/book/{id}")
	public Book getBook(@PathVariable("id") String id) {
		Book book = new Book();
		book.setId(id);
		if(books.contains(book)) {
			book = books.get(Integer.parseInt(id) - 1);
		}
		return book;
	}
	
	@PutMapping("/book/{id}")
	public Book updateBook(@PathVariable("id") String id, @RequestBody Book book) {
		int index = 0;
		for (Book b : books) {
			if (b.equals(book)) {
				books.set(index, book);
				break;
			}
			index = index + 1;
		}
		return book;
	}
	
	@DeleteMapping("/book/{id}")
	public String deleteBook(@PathVariable("id") String id) {
		Book b = new Book();
		b.setId(id);
		books.remove(b);
		return "Deleted Successfully";
	}

}
