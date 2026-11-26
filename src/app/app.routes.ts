import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Montana } from './montana/montana';
import { Senderos } from './senderos/senderos';
import { Familia } from './familia/familia';

export const routes: Routes = [
  { path: '', component: Home, title: 'Mixtlis en la Montaña' },
  { path: 'senderos', component: Senderos, title: 'Senderos | Mixtlis en la Montaña' },
  { path: 'montana', component: Montana, title: 'Montaña | Mixtlis en la Montaña' },
  { path: 'familia', component: Familia, title: 'Familia | Mixtlis en la Montaña' },
  { path: '**', redirectTo: '' },
];
