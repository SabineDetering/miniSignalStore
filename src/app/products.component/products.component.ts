import { Component, inject } from '@angular/core';
import { BookShopStore } from '../store/bookshop.store';

@Component({
  selector: 'app-products.component',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  
  store = inject(BookShopStore);

}
