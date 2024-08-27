import { ProductService } from './../service/C-product/product.service';
import { Component, OnInit } from '@angular/core'; // Asegúrate de que la ruta sea correcta
// Asegúrate de que la ruta sea correcta


export interface Product {
  productID: number;
  name: string;
  sku: string;
  amount: number;
  price: number;
  sellerID: number;  // Asegúrate de que el nombre sea el mismo que el que recibes del backend
  createdAt: string; // Asegúrate de que el nombre sea el mismo que el que recibes del backend
}

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];

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
}

