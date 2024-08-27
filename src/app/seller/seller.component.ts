import { Component } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  isFormVisible = false;
  product = {
    name: '',
    sku: '',
    quantity: 0,
    price: 0
  };

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  createProduct() {
    // Aquí deberías enviar el producto a tu API para crear el nuevo producto
    console.log('Producto creado:', this.product);

    // Restablece el formulario
    this.product = {
      name: '',
      sku: '',
      quantity: 0,
      price: 0
    };
    this.isFormVisible = false;
  }
}

