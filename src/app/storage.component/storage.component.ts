import { Component, computed, inject } from '@angular/core';
import { BookWithStoredAmount, Id } from '../store/bookshop-types';
import { BookShopStore } from '../store/bookshop.store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-storage.component',
  imports: [TableModule, ButtonModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
})
export class StorageComponent {  
  protected store = inject(BookShopStore);

  protected stock= computed<Array<BookWithStoredAmount>>(() => 
     this.store.books().map(book => ({
        ...book,
        storedAmount: this.store.stock()[book.id] || 0
    })));
  
  // delivered(bookId: Id, amount: number){
  //   this.store.dispatch(bookShopEvents.bookshopBookReceived({bookId: bookId, amount: amount}))
  // }
}
