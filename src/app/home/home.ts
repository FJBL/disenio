import { Component } from '@angular/core';
import difficultyLevelsData from '../data/difficulty-levels.json';
import socialLinksData from '../data/social-links.json';
import { Adventures } from '../adventures/adventures';
import { More } from '../more/more';

type SocialLink = {
  id: string;
  label: string;
  url: string;
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
  selector: 'app-home',
  imports: [Adventures, More],
  templateUrl: './home.html',
})
export class Home {
  protected readonly socialLinks: readonly SocialLink[] = socialLinksData;
  protected readonly difficultyLevels: readonly DifficultyLevel[] = difficultyLevelsData;

  protected scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

}
