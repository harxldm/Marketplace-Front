import { Component } from '@angular/core';
import { ProductService } from '../service/C-product/product.service'; // Asegúrate de que el path sea correcto

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  productName: string = '';
  productSKU: string = '';
  productAmount: number = 1;
  productPrice: number = 0;

  constructor(private productService: ProductService) {}



  onConfirm() {


    const product = {
      name: this.productName,
      sku: this.productSKU,
      price: this.productPrice,
      amount: this.productAmount

    };

    const token = localStorage.getItem('authToken');  // Verifica que el token está siendo recuperado
    console.log('Token:', token); // Asumiendo que guardas el token en localStorage

    if (token) {
      this.productService.createProduct(product, token).subscribe(
        (response) => {
          console.log('Producto creado exitosamente:', response);
          // Aquí puedes agregar lógica para manejar el éxito
        },
        (error) => {
          console.error('Error al crear el producto:', error);
          // Aquí puedes agregar lógica para manejar errores
        }
      );
    } else {
      console.error('No se encontró el token');
    }
  }
}



