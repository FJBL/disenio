import { Component } from '@angular/core';
import contactData from '../data/more.json';

type ContactDetails = {
  nombreCompleto: string;

  whatsapp: string;
  horarioAtencion: {
    dias: string[];
    horaInicio: string;
    horaFin: string;
    zonaHoraria: string;
  };
};

@Component({
  selector: 'app-more',
  templateUrl: './more.html',
  styleUrl: './more.scss',
})
export class More {
  protected readonly contacts: readonly ContactDetails[] = contactData;

  protected phoneLink(phone: string): string {
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
  }

  protected whatsappLink(phone: string): string {
    return `https://wa.me/${phone.replace(/\D/g, '')}`;
  }
}
