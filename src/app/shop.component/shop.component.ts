import { Component, inject, signal, effect, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { BookShopStore } from '../store/bookshop.store';
import { FormsModule } from '@angular/forms';
import { Id } from '../store/bookshop-types';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-shop.component',
  imports: [FormsModule, InputNumberModule, ButtonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {
  store = inject(BookShopStore);
  protected amountsToOrder: Record<Id, WritableSignal<number>> = {};

  constructor(){  
    effect(() => {
      const books = this.store.books();
      books.forEach(book => {
        if (!this.amountsToOrder[book.id]) {
          this.amountsToOrder[book.id] = signal(1);
        }
      });
    });    
  }

}
