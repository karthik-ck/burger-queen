import { Injectable, Inject, PLATFORM_ID, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cartItems';
  private cart: Product[] = [];
  cartUpdated = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = sessionStorage.getItem(this.cartKey);
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  private saveCartToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.cartUpdated.emit();
    }
  }

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCartToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity < 1) this.removeItem(productId);
      this.saveCartToStorage();
    }
  }

  removeItem(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCartToStorage();
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotal(): number {
    const discount = 0;
    return this.getSubtotal() - discount;
  }

  checkout() {
    alert('Order placed successfully!');
    this.clearCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
  }
}
