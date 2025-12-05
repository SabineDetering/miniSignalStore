import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Book, Id, Order } from "./bookshop-types";
import { initialData } from "./bookshop-initial";
import { computed } from "@angular/core";

export interface BookShopState {
    books: Array<Book>;
    stock:  Record<number, number>;
    orders: Array<Order>;
}
  
export const initialBookShopState: BookShopState = {
    books:[],
    stock:  {},
    orders:[],
};

export const BookShopStore = signalStore(
    {providedIn: 'root'},
    withState(initialData),
    withComputed(store => (
        {
            availableBooks: computed(()=> store.books().filter(book => store.stock()[book.id] >0))
        }
    )),
    withMethods(store =>({
        order( bookId: Id, amount: number ){
            patchState(store, (state) =>({ ...state, stock: {...store.stock(), [bookId]: store.stock()[bookId] - amount}}))
        }
    }))
);