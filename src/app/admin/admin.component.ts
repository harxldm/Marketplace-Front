import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/C-product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: any[] = [];
  filterSellerID: string = ''; // Variable para almacenar el ID del vendedor a filtrar

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

  // Método para filtrar los productos por ID de vendedor
  filterBySellerID(): void {
    if (this.filterSellerID) {
      this.productService.getProductsBySeller(this.filterSellerID).subscribe(
        data => {
          this.products = data.products.map((product: any) => ({
            ...product,
            createdAt: new Date(product.created_at).toLocaleString(),
            sellerID: product.selerID
          }));
        },
        error => {
          console.error('Error al filtrar los productos por ID de vendedor', error);
        }
      );
    } else {
      // Si no hay un ID de vendedor ingresado, carga todos los productos
      this.loadProducts();
    }
  }
}

