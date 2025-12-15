export type Id = number;

export interface IBook {
    id: Id;
    title: string;     
    author: string;
    price: number;
    numberOfPages: number;
    weightInGramm: number;
    description: string;  
}

export class Book {
 private static  currentId = 0;
 public id: Id;
 
constructor(
    public title: string, 
    public author: string,
    public price: number, 
    public numberOfPages: number, 
    public weightInGramm: number, 
    public description = '' 
){
    Book.currentId +=1;
    this.id = Book.currentId;
}
}

export type Order = {
    clientId: number,
    bookId:  number, amount: number
}

export type BookWithStoredAmount = Book & {storedAmount: number};

