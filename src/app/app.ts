import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import difficultyLevelsData from './difficulty-levels.json';
import navigationData from './navigation.json';
import { Adventures } from './adventures/adventures';

type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

type DifficultyLevel = {
  number: number;
  title: string;
  description: string;
  mascot: string;
  ratingImage: string;
  ratingLabel: string;
  countLabel: string;
};

@Component({
  selector: 'app-root',
  imports: [FormsModule, Adventures],
  templateUrl: './app.html',
})
export class App {
  protected menuOpen = false;
  protected contactSubmitted = false;

  protected readonly navigationItems: readonly NavigationItem[] = navigationData;

  protected readonly difficultyLevels: readonly DifficultyLevel[] = difficultyLevelsData;

  protected toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  protected closeMenu(): void {
    this.menuOpen = false;
  }

  protected scrollTo(sectionId: string): void {
    this.closeMenu();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  protected sendMessage(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.contactSubmitted = true;
    form.resetForm();
  }

}
