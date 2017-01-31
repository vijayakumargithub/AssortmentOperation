import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProductService } from './product.services';
import { Product } from './product.model';

@Component({
    providers: [ProductService],
    selector: 'app-product',
    templateUrl:'./product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

 constructor(private productService: ProductService) { }

    productArray: Product[];
    products: Product[] = [];
    submitSelected: boolean = true;
    editselected: boolean = false;

 // Load all products
    loadProducts() {
        this.productService.getProducts()
            .subscribe(
            products => {
                    this.productArray = products,
                    console.log('ProductDetails', this.productArray);
                    },
            err => {
                    console.log(err);
            });
    }

        //Add a product
        onSubmit(productData) {
            this.saveUpdateProduct(productData);
             this.editselected = false;
        }

    //Update a product
        updateProduct(productData) {
            this.saveUpdateProduct(productData);
            this.submitSelected = true;
            this.editselected = false;
        }

    //create/update a product
   saveUpdateProduct(productData) {

        if (productData.productName || productData.quantity || productData.availabilityStatus ) {
            let data = {
                name: productData.productName,
                description: productData.quantity,
                languageCode: productData.availabilityStatus,
                id: (productData.productId) ? productData.productId : 0
            }
            if (productData.productId) {

                this. productService.updateProduct(data).subscribe(
                    data => {
                        this.loadProducts();
                        this.products = [];
                        return true;
                    },
                    error => {
                        console.error("Error updating product!");
                        alert(`Product update failed. ${error}`);
                    }
                );
            }
            else {
                this. productService.createProduct(data).subscribe(
                    data => {
                        this.loadProducts();
                        this.products = [];
                        return true;
                    },
                    error => {
                        console.error("Error saving product!");
                        alert(`Product save failed. ${error}`);
                    }
                );
            }
        }
        else
        {
            alert("Please enter the data");
             this.editselected = true;
             return false;
        }
    }

   //Edit a product
    editProduct(productData)
    {    this.products = productData;
         this.editselected = true;
        this.submitSelected = false;
    }

    //Delete a Product
    deleteProduct(id) {
        this.productService.deleteProduct(id).subscribe(
            data => {
                this.loadProducts();
                return true;
            },
            error => {
                console.error("Error deleting product!");
                alert(`Product delete failed. ${error}`);
            }
        );
    }

     ngOnInit() {
           this.loadProducts();
    }
}
