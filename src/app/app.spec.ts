import { TestBed } from '@angular/core/testing';
import { App } from './app';
import difficultyLevelsData from './data/difficulty-levels.json';
import adventuresData from './data/adventures.json';
import navigationData from './data/navigation.json';
import contactData from './data/more.json';
import socialLinksData from './data/social-links.json';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the homepage hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('la ruta que estás');
  });

  it('should render the route cards and all six difficulty levels', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-adventures .adventure-card').length).toBe(
      adventuresData.length,
    );
    expect(compiled.querySelectorAll('.difficulty-card').length).toBe(difficultyLevelsData.length);
  });

  it('should render navigation items from the menu data', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = fixture.nativeElement.querySelectorAll('.main-nav a');
    expect(links.length).toBe(navigationData.length);
    expect(links[0].textContent.trim()).toBe('INICIO');
    expect(links[0].getAttribute('href')).toBe('#inicio');
  });

  it('should render social links from the social links data', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll<HTMLAnchorElement>('.social-rail a');

    expect(links.length).toBe(socialLinksData.length);
    socialLinksData.forEach((social, index) => {
      expect(links[index].href).toBe(social.url);
      expect(links[index].getAttribute('aria-label')).toBe(social.label);
      expect(links[index].target).toBe('_blank');
    });
  });

  it('should show contact details and business hours from the More JSON data', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const moreLink = compiled.querySelector<HTMLAnchorElement>('.main-nav a[href="#mas"]');
    const contactCards = compiled.querySelectorAll('#contacto .contact-card');
    const whatsappLinks = compiled.querySelectorAll<HTMLAnchorElement>(
      '#contacto a[target="_blank"]',
    );

    expect(moreLink?.textContent?.trim()).toBe(
      navigationData.find((item) => item.id === 'mas')?.label,
    );
    expect(contactCards.length).toBe(contactData.length);
    expect(compiled.querySelector('#contacto h3')?.textContent).toContain(
      contactData[0].nombreCompleto,
    );
    expect(compiled.querySelector('#contacto .hours')?.textContent).toContain(
      contactData[0].horarioAtencion.zonaHoraria,
    );
    expect(whatsappLinks[0].href).toBe('https://wa.me/525512345678');
  });

  it('should show available and sold-out adventure statuses with distinct colors', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.sold-out.is-available')?.textContent.trim()).toBe('DISPONIBLE');
    expect(compiled.querySelectorAll('.sold-out.is-sold-out').length).toBe(2);
  });

  it('should link to the WhatsApp channel instead of asking for an email', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const joinLink = compiled.querySelector<HTMLAnchorElement>('.whatsapp-join');

    expect(joinLink?.href).toBe('https://whatsapp.com/channel/0029Va9Mu0yF6sn2kzPNpL3A');
    expect(joinLink?.target).toBe('_blank');
    expect(compiled.querySelector('#newsletter-email')).toBeNull();
  });
});
