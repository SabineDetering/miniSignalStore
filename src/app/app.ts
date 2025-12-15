import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly title = signal('Mini Signal Store');
  private readonly router = inject(Router);

  protected navItems: MenuItem[] = [
            {               
                items: [
                    {
                        label: 'Shop',
                        icon: 'pi pi-shopping-bag',
                        routerLink: '/shop'
                    },
                    {
                        label: 'Produkte',
                        icon: 'pi pi-book',
                        routerLink: '/products'
                    },
                    {
                        label: 'Lager',
                        icon: 'pi pi-box',
                        routerLink: '/storage'
                    }
                ]
            }
        ];
    
}
