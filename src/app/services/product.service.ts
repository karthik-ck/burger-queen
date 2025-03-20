import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    { id: 1, name: 'Classic Cheese Burger', price: 200, quantity: 1, image: 'assets/image-1.jpg' },
    { id: 2, name: 'Spicy Chicken Burger', price: 225, quantity: 1, image: 'assets/image-2.jpg' },
    { id: 3, name: 'BBQ Beef Burger', price: 250, quantity: 1, image: 'assets/image-3.jpg' },
    { id: 4, name: 'Veggie Delight Burger', price: 300, quantity: 1, image: 'assets/image-4.jpg' },
    { id: 5, name: 'Double Cheese Burger', price: 325, quantity: 1, image: 'assets/image-5.jpg' },
    { id: 6, name: 'Crispy Chicken Burger', price: 250, quantity: 1, image: 'assets/image-6.jpg' },
    { id: 7, name: 'Bacon Blast Burger', price: 350, quantity: 1, image: 'assets/image-7.jpg' },
    { id: 8, name: 'Peri Peri Chicken Burger', price: 400, quantity: 1, image: 'assets/image-8.jpg' },
    { id: 9, name: 'Mushroom Melt Burger', price: 450, quantity: 1, image: 'assets/image-9.jpg' },
    { id: 10, name: 'Grilled Chicken Burger', price: 330, quantity: 1, image: 'assets/image-10.jpg' },
    { id: 11, name: 'Truffle Cheese Burger', price: 500, quantity: 1, image: 'assets/image-11.jpg' },
    { id: 12, name: 'Zesty Lamb Burger', price: 370, quantity: 1, image: 'assets/image-12.jpg' }
  ];
  

  getProducts() {
    return this.products;
  }
}
