import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component/products.component';
import { StorageComponent } from './storage.component/storage.component';
import { ShopComponent } from './shop.component/shop.component';

export const routes: Routes = [
    {path:'', redirectTo:'/shop', pathMatch: 'full'},
    { path: 'shop', component: ShopComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'storage', component: StorageComponent },
];
