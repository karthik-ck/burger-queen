import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule ,Location} from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Product[] = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.getCart();
    this.calculateTotals();

    if (this.cart.length === 0) {
      this.location.back()
    }
  }

  updateQuantity(productId: number, change: number) {
    const item = this.cart.find(product => product.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        this.cartService.updateQuantity(productId, newQuantity);
        this.loadCart();
      }
    }
  }

  removeItem(productId: number) {
    this.cartService.removeItem(productId);
    this.loadCart();
  }

  calculateTotals() {
    this.subtotal = this.cartService.getSubtotal();
    this.total = this.cartService.getTotal();
  }

  buyNow() {
    console.log(this.cart)
    this.cartService.checkout();
    this.location.back()
  }
}
