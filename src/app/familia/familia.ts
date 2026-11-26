import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import familiaData from '../data/familia.json';

type FamilyActivity = {
  image: string;
  titulo: string;
  descripcion: string;
  tipoActividad: string;
  fecha: {
    inicio: string;
    fin: string;
    textoOriginal: string;
  };
  duracion?: string;
  lugares: string[];
  puntosEncuentro: {
    hora: string;
    lugar: string;
  }[];
  regreso?: {
    hora?: string;
    descripcion?: string;
  };
  datosTecnicos?: {
    nivel?: string;
    categoria?: string;
    distanciaKm?: number;
    desnivelMetros?: number;
    altitudMinimaMsnm?: number;
    altitudMaximaMsnm?: number;
    condicionFisica?: string;
  };
  costos: {
    precioBase?: number;
    anticipo?: number;
    precioAlternativo?: {
      descripcion: string;
      precio: number;
    }[];
    costosAdicionales?: {
      concepto: string;
      precio: number;
    }[];
  };
  incluye: string[];
  noIncluye?: string[];
  notas?: string[];
};

@Component({
  selector: 'app-familia',
  imports: [CurrencyPipe],
  templateUrl: './familia.html',
  host: { id: 'familia' },
})
export class Familia {
  protected readonly activities: readonly FamilyActivity[] = familiaData;
  protected searchQuery = '';

  protected get filteredActivities(): readonly FamilyActivity[] {
    const query = this.normalize(this.searchQuery.trim());

    if (!query) {
      return this.activities;
    }

    return this.activities.filter((activity) => {
      const searchableText = [
        activity.titulo,
        activity.descripcion,
        activity.tipoActividad,
        activity.fecha.textoOriginal,
        activity.duracion ?? '',
        ...activity.lugares,
      ].join(' ');

      return this.normalize(searchableText).includes(query);
    });
  }

  protected updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchQuery = event.target.value;
    }
  }

  protected clearSearch(): void {
    this.searchQuery = '';
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  }
}
