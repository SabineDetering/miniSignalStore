import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Book, Id, Order } from "./bookshop-types";
import { initialData } from "./bookshop-initial";
import { computed } from "@angular/core";
import { withDevtools, withImmutableState } from "@angular-architects/ngrx-toolkit";

export interface BookShopState {
    books: Array<Book>;
    stock:  Record<Id, number>;
    orders: Array<Order>;
}
  
export const emptyBookShopState: BookShopState = {
    books:[],
    stock: {},
    orders:[],
};

export const BookShopStore = signalStore(
    {providedIn: 'root'},
    withImmutableState(emptyBookShopState),
    withDevtools('bookstore'),
    withComputed(store => ({
            availableBooks: computed(()=> store.books().filter(book => store.stock()[book.id] >0))
    })),
    withMethods(store =>({
        ordered( bookId: Id, amount: number ){
            patchState(store, (state) =>({ ...state, stock: {...store.stock(), [bookId]: store.stock()[bookId] - amount}}))
        },
        received( bookId: Id, amount: number ){
            patchState(store, (state) =>({ ...state, stock: {...store.stock(), [bookId]: (store.stock()[bookId] ?? 0) + amount}}))
        },
        addOrUpdateBook( book: Book ){
            const existingBookIndex = store.books().findIndex(b => b.id === book.id);
            const updatedBooks = existingBookIndex >=0 ? [...store.books().toSpliced( existingBookIndex, 1, book)] : [...store.books(), book];            
            patchState(store, (state) =>({ 
                ...state, 
                books: updatedBooks,
                stock: {...store.stock(), [book.id]:  0}
             }));                   
        }
    })),
    withHooks({
        onInit: (store) => {
            patchState(store, initialData);
        }
    })
);