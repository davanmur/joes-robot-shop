import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: any;
  filter: string = '';
  // private cartSvc: CartService = inject(CartService);

  constructor(
    private cartSvc: CartService, 
    private productSvc: ProductService
  ) {
    
  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    }) 
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getDiscountedClasses(product: IProduct) {
    if (product.discount > 0) return ['strikethrough'];
    else return '';
  }

  getFilteredProducts() {
    return this.filter === ''
    ? this.products
    : this.products.filter((product: any) => product.category === this.filter);
  }
}