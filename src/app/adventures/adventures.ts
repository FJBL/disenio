import { Component } from '@angular/core';
import adventuresData from '../data/adventures.json';

type Adventure = {
  id: string;
  name: string;
  date: string;
  level: string;
  image: string;
  link: string;
  status: string;
  distance: string;
  elevation: string;
  duration: string;
};

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.html',
})
export class Adventures {
  protected readonly adventures: readonly Adventure[] = adventuresData;
}
