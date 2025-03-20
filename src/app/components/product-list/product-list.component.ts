import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  searchTerm: string = '';
  popularItems: Product[] = [];
  specialOffers: Product[] = [];
  newArrivals: Product[] = [];
  cartItemCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.applyFilter();

    this.updateCartCount();
    this.cartService.cartUpdated.subscribe(() => this.updateCartCount());
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCart().length;
  }

  applyFilter() {
    this.popularItems = this.products.slice(0, 4);
    this.specialOffers = this.products.slice(4, 8);
    this.newArrivals = this.products.slice(8, 12);
  }

  applySearch() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.popularItems = this.products
      .filter((p) => p.name.toLowerCase().includes(searchTerm))
      .slice(0, 4);

    this.specialOffers = this.products
      .filter((p) => p.name.toLowerCase().includes(searchTerm))
      .slice(4, 8);

    this.newArrivals = this.products
      .filter((p) => p.name.toLowerCase().includes(searchTerm))
      .slice(8, 12);
  }

  addToCart(product: Product) {
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeItem(productId);
  }

  isInCart(productId: number): boolean {
    return this.cartService.getCart().some((item) => item.id === productId);
  }

  viewDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
