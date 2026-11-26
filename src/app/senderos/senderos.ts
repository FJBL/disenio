import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import senderosData from '../data/senderos.json';

type Sendero = {
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
  selector: 'app-senderos',
  imports: [CurrencyPipe],
  templateUrl: './senderos.html',
})
export class Senderos {
  protected readonly senderos: readonly Sendero[] = senderosData;
  protected searchQuery = '';

  protected get filteredSenderos(): readonly Sendero[] {
    const query = this.normalize(this.searchQuery.trim());

    if (!query) {
      return this.senderos;
    }

    return this.senderos.filter((sendero) => {
      const searchableText = [
        sendero.titulo,
        sendero.descripcion,
        sendero.tipoActividad,
        sendero.fecha.textoOriginal,
        ...sendero.lugares,
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
