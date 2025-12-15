import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BookShopStore } from '../store/bookshop.store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Book, Id } from '../store/bookshop-types';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { form, Field, required,  min, minLength } from '@angular/forms/signals'
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { InputNumber } from "primeng/inputnumber";
import { Message } from 'primeng/message';

@Component({
  selector: 'app-products.component',
  imports: [FormsModule, Field, ButtonModule, DialogModule, InputTextModule, IftaLabelModule, InputNumber, TextareaModule, Message],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  
  store = inject(BookShopStore);

  isEditDialogVisible = signal(false);

  bookModel = signal<Book>(new Book('', '', 0, 0, 0,''));

  bookForm = form(this.bookModel, (schemaPath) => {
    required(schemaPath.title, { message: 'Title is required' })
    required(schemaPath.author, { message: 'Author is required' })
    min(schemaPath.price, 0.00, { message: 'Price must be at least 0' })
    min(schemaPath.numberOfPages, 0, { message: 'Number of pages must be at least 0' })
    min(schemaPath.weightInGramm, 0, { message: 'Weight must be at least 0 gram' })
  });

  openEditDialog(bookId?: Id){ 
    this.bookForm().reset();
    this.bookModel.set(this.store.books().find(book => book.id === bookId) || new Book('', '', 0, 0, 0));
    this.isEditDialogVisible.set(true);
  }

  saveBook(){
    if (this.bookForm().valid()) {
      this.store.addOrUpdateBook(this.bookModel());
      this.isEditDialogVisible.set(false);
    }
  }

  cancelEdit(){
    this.isEditDialogVisible.set(false);
  }
}

