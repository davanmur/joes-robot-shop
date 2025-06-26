import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: IProduct; // @Input >> can receive data from a parent
  @Output() buy = new EventEmitter(); // event >> we can listen to it on the parent

  getImageUrl(product: IProduct) {
    return '/assets/images/robot-parts/' + product.imageName;
  }

  buyButtonClicked(product: IProduct) {
    this.buy.emit();
  }
}
