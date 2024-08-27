import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/C-product/product.service';





@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        console.log('Datos recibidos:', data); // Verifica la respuesta completa
        this.products = data.products.map((product: any) => ({
          ...product,
          createdAt: new Date(product.created_at).toLocaleString(), // Ajusta el formato si es necesario
          sellerID: product.selerID  // Ajusta el nombre del campo
        }));
      },
      error => {
        console.error('Error al obtener los productos', error);
      }
    );
  }
}

