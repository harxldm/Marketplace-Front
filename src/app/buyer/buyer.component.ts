import { ProductService } from './../service/C-product/product.service';
import { Component, OnInit } from '@angular/core';
 // Asegúrate de que la ruta sea correcta
 export interface Product {
  productId: number;
  name: string;
  sku: string;
  amount: number;
  price: number;
  sellerId: number;
  createdAt: Date;
}

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];

  // Propiedades para filtros
  filterName: string = '';
  filterSku: string = '';
  filterPriceMin: number | null = null;
  filterPriceMax: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data.products;
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter(item => item !== product);
  }

  getTotal(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }

  checkout(): void {
    // Implementa la lógica para el proceso de compra
    console.log('Checkout', this.cart);
  }

  filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesName = product.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchesSku = product.sku.toLowerCase().includes(this.filterSku.toLowerCase());
      const matchesPrice = (!this.filterPriceMin || product.price >= this.filterPriceMin) &&
                           (!this.filterPriceMax || product.price <= this.filterPriceMax);
      return matchesName && matchesSku && matchesPrice;
    });
  }
}


