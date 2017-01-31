import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Product } from './product.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

    private serviceUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
        this.serviceUrl = 'http://localhost:3000/products';
      }

   // Fetch all existing products
    getProducts(): Observable<Product[]> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.get(this.serviceUrl, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    //Save a product
    createProduct(productData: Object): Observable<Product> {
        let addData = JSON.stringify(productData);
        return this.http.post(this.serviceUrl, addData, { headers: this.headers })
            .map(res => <Product>res.json())
           .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    //Update a product
    updateProduct(productData: Object): Observable<Product> {
        let serviceUrl = `${this.serviceUrl}/${productData['id']}`;
        return this.http.put(serviceUrl, JSON.stringify(productData), { headers: this.headers })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



    //delete a product
    deleteProduct(id: number): Observable<Product> {
        let serviceUrl = `${this.serviceUrl}/${id}`;
        return this.http.delete(serviceUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
