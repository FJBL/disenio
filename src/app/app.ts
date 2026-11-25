import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

type Adventure = {
  name: string;
  date: string;
  level: string;
  image: string;
  link: string;
  status: string;
};

type DifficultyLevel = {
  number: number;
  title: string;
  description: string;
  mascot: string;
};

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  protected menuOpen = false;
  protected contactSubmitted = false;
  protected newsletterSubmitted = false;

  protected readonly adventures: Adventure[] = [
    {
      name: 'Cumbre Iztaccihuatl',
      date: '7–8 NOV 2026',
      level: '5 y 6 garritas · Hija(o) de Las Nubes',
      image: 'assets/images/iztaccihuatl.webp',
      link: 'https://www.mixtlisenlamontana.com/rutas/cumbre-iztaccihuatl',
      status: 'AGOTADO',
    },
    {
      name: 'Nevado de Colima',
      date: '29 ENE–1 FEB 2027',
      level: '5 garritas · Guerrero/a Mixtli',
      image: 'assets/images/nevado-colima.webp',
      link: 'https://www.mixtlisenlamontana.com/rutas/nevado-de-colima',
      status: 'AGOTADO',
    },
    {
      name: 'Sierra Negra',
      date: '21–22 NOV 2026',
      level: '4 garritas · Guardián de la Montaña',
      image: 'assets/images/sierra-negra.webp',
      link: 'https://www.mixtlisenlamontana.com/rutas/sierra-negra',
      status: 'AGOTADO',
    },
  ];

  protected readonly difficultyLevels: DifficultyLevel[] = [
    {
      number: 1,
      title: 'Primeros pasos',
      description: 'Paseos tranquilos para descubrir el senderismo y disfrutar a tu propio ritmo.',
      mascot: 'assets/images/mascot-nori.webp',
    },
    {
      number: 2,
      title: 'Ritmo ligero',
      description: 'Primeras experiencias y senderos de exigencia ligera a moderada.',
      mascot: 'assets/images/mascot-nori.webp',
    },
    {
      number: 3,
      title: 'Explorador/a',
      description: 'Rutas con mayor distancia y desnivel. Ideal si ya tienes experiencia caminando.',
      mascot: 'assets/images/mascot-gui.webp',
    },
    {
      number: 4,
      title: 'Guardián de la montaña',
      description: 'Terreno variable y ascensos retadores; requiere condición física y preparación.',
      mascot: 'assets/images/mascot-gui.webp',
    },
    {
      number: 5,
      title: 'Guerrero/a Mixtli',
      description: 'Rutas de alta exigencia, gran desnivel y jornadas largas en montaña.',
      mascot: 'assets/images/mascot-vico.webp',
    },
    {
      number: 6,
      title: 'Hija(o) de las nubes',
      description: 'Experiencias de alta montaña para personas con experiencia y buena preparación.',
      mascot: 'assets/images/mascot-muyal.webp',
    },
  ];

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

  protected subscribe(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.newsletterSubmitted = true;
    form.resetForm();
  }
}
