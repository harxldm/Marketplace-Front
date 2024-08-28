import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/C-product/product.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  productName: string = '';
  productSKU: string = '';
  productAmount: number = 1;
  productPrice: number = 0;
  products: any[] = []; // Aquí almacenaremos los productos

  constructor(private productService: ProductService) {}

  isFormVisible = false;

  ngOnInit() {
    this.fetchProducts(); // Obtener los productos al iniciar el componente
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onConfirm() {
    const product = {
      name: this.productName,
      sku: this.productSKU,
      price: this.productPrice,
      amount: this.productAmount
    };

    const token = localStorage.getItem('authToken');
    console.log('Token:', token);

    if (token) {
      this.productService.createProduct(product, token).subscribe(
        (response) => {
          console.log('Producto creado exitosamente:', response);
          this.fetchProducts(); // Actualizar la lista de productos después de crear uno nuevo
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
      console.error('No se encontró el token');
    }
  }

  createProduct() {
    this.isFormVisible = false;
  }

  fetchProducts() {
    const token = localStorage.getItem('authToken');

    if (token) {
      this.productService.getProductsBySeller(token).subscribe(
        (data: any) => {
          this.products = data.products; // Asigna los productos obtenidos a la propiedad products
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
        }
      );
    } else {
      console.error('No se encontró el token');
    }
  }
}




