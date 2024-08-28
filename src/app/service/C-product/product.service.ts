import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  productId: number;
  name: string;
  sku: string;
  amount: number;
  price: number;
  sellerId: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})


export class ProductService {



  private createProductUrl = 'http://localhost:8080/createProduct';  // URL para crear productos
  private getAllProductsUrl = 'http://localhost:8080/getAll';
  private getProductsBySellerID = 'http://localhost:8080/getProductsBySellerId'; // URL para obtener todos los productos

  constructor(private http: HttpClient) { }

  // Método para crear un nuevo producto
  createProduct(product: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.createProductUrl, product, { headers });
  }

  // Método para obtener todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get(this.getAllProductsUrl);
  }

  getProductsBySeller(token: string): Observable<any> {
        const headers = new HttpHeaders({
           'Authorization': `Bearer ${token}`
        });

        return this.http.get(`${this.getProductsBySellerID}`, { headers });
      }
}

