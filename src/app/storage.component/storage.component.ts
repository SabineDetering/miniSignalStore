import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { BookWithStoredAmount, Id } from '../store/bookshop-types';
import { BookShopStore } from '../store/bookshop.store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-storage.component',
  imports: [FormsModule, TableModule, InputNumberModule, ButtonModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StorageComponent {  
  protected store = inject(BookShopStore);
  
  protected amountsReceived: Record<Id, WritableSignal<number>> = {};

  protected stock = computed<Array<BookWithStoredAmount>>(() => 
     this.store.books().map(book => ({
        ...book,
        storedAmount: this.store.stock()[book.id] || 0
    })));
  
   constructor(){  
    effect(() => {
      const books = this.store.books();
      books.forEach(book => {
        if (!this.amountsReceived[book.id]) {
          this.amountsReceived[book.id] = signal(1);
        }
      });
    });    
  }
}
