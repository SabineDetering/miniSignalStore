import { Book } from "./bookshop-types";
import { BookShopState } from "./bookshop.store";

const books: Array<Book> = [
    new Book('Irgendein Buch', 'Lieblings Autor', 9.5, 150, 85, 'Toller Inhalt'),
    new Book('Angular Handbuch', 'Nerdie Frontman', 29.99, 420, 985, 'Alles, was man über Angular wissen muss, und auch alles, was man gar nicht wissen wollte'),
    new Book('Noch ein Buch', 'Soein Schreiberling', 14.90, 233, 140, 'Kann man lesen, muss man aber nicht')
]

const stock: Record<number,number> = {};
stock[1] = 12;
stock[2] = 10;
stock[3] = 55;

export const initialData: BookShopState = {
    books: books,
    stock: stock,
    orders:[]
}