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
    stock:  {},
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
        order( bookId: Id, amount: number ){
            patchState(store, (state) =>({ ...state, stock: {...store.stock(), [bookId]: store.stock()[bookId] - amount}}))
        }
    })),
    withHooks({
        onInit: (store) => {
            patchState(store, initialData);
        }
    })
);