import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
    // this.filter = this.route.snapshot.params['filter']; // snapshot >> looks at component when first loaded
    // subscription that listens to the change of route parameters
    this.route.queryParams.subscribe((params) => {
    // this.route.params.subscribe((params) => {
      this.filter = params['filter'] ?? '';
    })
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
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