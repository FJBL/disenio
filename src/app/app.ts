import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import navigationData from './data/navigation.json';

type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected menuOpen = false;
  protected readonly navigationItems: readonly NavigationItem[] = navigationData;

  protected toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  protected closeMenu(): void {
    this.menuOpen = false;
  }
}
