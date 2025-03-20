import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: Product | undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProducts().find(p => p.id === productId);
    if (this.product) {
      this.quantity = this.product.quantity;
    }
  }

  increaseQuantity() {
    if (this.product) {
      this.quantity++;
      this.cartService.updateQuantity(this.product.id, this.quantity);
    }
  }

  decreaseQuantity() {
    if (this.product && this.quantity > 1) {
      this.quantity--;
      this.cartService.updateQuantity(this.product.id, this.quantity);
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeItem(productId);
  }

  isInCart(productId: number): boolean {
    return this.cartService.getCart().some((item) => item.id === productId);
  }

  goBack() {
    this.location.back()
  }

}
