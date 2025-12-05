import { Component, inject } from '@angular/core';
import { BookShopStore } from '../store/bookshop.store';

@Component({
  selector: 'app-shop.component',
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  store = inject(BookShopStore);

}
