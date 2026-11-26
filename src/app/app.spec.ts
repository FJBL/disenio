import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import adventuresData from './data/adventures.json';
import navigationData from './data/navigation.json';
import contactData from './data/more.json';
import socialLinksData from './data/social-links.json';
import difficultyLevelsData from './data/difficulty-levels.json';
import montanaData from './data/montana.json';
import senderosData from './data/senderos.json';
import familiaData from './data/familia.json';
import { routes } from './app.routes';

async function createAppFixture(url = '/') {
  const fixture = TestBed.createComponent(App);
  fixture.detectChanges();
  await TestBed.inject(Router).navigateByUrl(url);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the homepage hero heading', async () => {
    const fixture = await createAppFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('la ruta que estás');
  });

  it('should render the adventure and difficulty cards from their data', async () => {
    const fixture = await createAppFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-adventures .adventure-card').length).toBe(
      adventuresData.length,
    );
    expect(compiled.querySelectorAll('.difficulty-card').length).toBe(difficultyLevelsData.length);
    const calendarLink = compiled.querySelector<HTMLAnchorElement>('.calendar-link');
    expect(calendarLink?.getAttribute('href')).toBe('/app/data/calendario.pdf');
    expect(calendarLink?.getAttribute('download')).toBe('calendario.pdf');
  });

  it('should show only the Montana page between the persistent header and footer', async () => {
    const fixture = await createAppFixture('/montana');
    const compiled = fixture.nativeElement as HTMLElement;
    const montanaLink = compiled.querySelector<HTMLAnchorElement>('.main-nav a[href="/montana"]');
    const activityImages = compiled.querySelectorAll<HTMLImageElement>(
      'app-montana .activity-image',
    );

    expect(compiled.querySelectorAll('app-montana .activity-card').length).toBe(montanaData.length);
    expect(compiled.querySelector('app-montana#montana')).not.toBeNull();
    expect(compiled.querySelector('app-montana h3')?.textContent).toContain(montanaData[0].titulo);
    expect(activityImages.length).toBe(montanaData.length);
    expect(activityImages[0].getAttribute('src')).toBe(montanaData[0].image);
    expect(compiled.querySelector('app-home')).toBeNull();
    expect(compiled.querySelector('app-adventures')).toBeNull();
    expect(compiled.querySelector('.social-rail')).toBeNull();
    expect(compiled.querySelector('.site-header')).not.toBeNull();
    expect(compiled.querySelector('.site-footer')).not.toBeNull();
    expect(montanaLink?.textContent?.trim()).toBe(
      navigationData.find((item) => item.id === 'montana')?.label,
    );
  });

  it('should render sendero cards from senderos.json with the shared adventure design', async () => {
    const fixture = await createAppFixture('/senderos');
    const compiled = fixture.nativeElement as HTMLElement;
    const senderoLink = compiled.querySelector<HTMLAnchorElement>('.main-nav a[href="/senderos"]');
    const cards = compiled.querySelectorAll('app-senderos .sendero-card');

    expect(cards.length).toBe(senderosData.length);
    expect(cards[0].querySelector('h3')?.textContent).toContain(senderosData[0].titulo);
    expect(cards[0].querySelector('.activity-image')?.getAttribute('src')).toBe(
      senderosData[0].image,
    );
    expect(cards[0].querySelector('.activity-overview dt')?.textContent).toBe('Fecha');
    expect(cards[0].querySelector('.activity-details h4')?.textContent).toBe('Datos de la ruta');
    expect(senderoLink?.textContent?.trim()).toBe(
      navigationData.find((item) => item.id === 'sendero')?.label,
    );
    expect(compiled.querySelector('app-home')).toBeNull();
    expect(compiled.querySelector('.site-header')).not.toBeNull();
    expect(compiled.querySelector('.site-footer')).not.toBeNull();
  });

  it('should filter senderos by text and ignore accents', async () => {
    const fixture = await createAppFixture('/senderos');
    const compiled = fixture.nativeElement as HTMLElement;
    const search = compiled.querySelector<HTMLInputElement>('#sendero-search-input');

    expect(search).not.toBeNull();
    search!.value = 'desierto';
    search!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-senderos .sendero-card').length).toBe(1);
    expect(compiled.querySelector('app-senderos .sendero-card h3')?.textContent).toContain(
      'Ermitas en el Desierto de los Leones',
    );

    search!.value = 'Iztaccíhuatl';
    search!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-senderos .sendero-card').length).toBe(1);
    expect(compiled.querySelector('app-senderos .sendero-card h3')?.textContent).toContain(
      'Iztaccíhuatl',
    );
  });

  it('should render family activities from familia.json using the Montana page structure', async () => {
    const fixture = await createAppFixture('/familia');
    const compiled = fixture.nativeElement as HTMLElement;
    const familiaLink = compiled.querySelector<HTMLAnchorElement>('.main-nav a[href="/familia"]');
    const cards = compiled.querySelectorAll('app-familia .activity-card');

    expect(compiled.querySelector('app-familia#familia')).not.toBeNull();
    expect(cards.length).toBe(familiaData.length);
    expect(cards[0].querySelector('h3')?.textContent).toContain(familiaData[0].titulo);
    expect(cards[0].querySelector('.activity-image')?.getAttribute('src')).toBe(
      familiaData[0].image,
    );
    expect(cards[0].querySelector('.activity-overview dt')?.textContent).toBe('Fecha');
    expect(familiaLink?.textContent?.trim()).toBe(
      navigationData.find((item) => item.id === 'familiar')?.label,
    );
    expect(compiled.querySelector('app-home')).toBeNull();
    expect(compiled.querySelector('.site-header')).not.toBeNull();
    expect(compiled.querySelector('.site-footer')).not.toBeNull();
  });

  it('should filter family activities by text and ignore accents', async () => {
    const fixture = await createAppFixture('/familia');
    const compiled = fixture.nativeElement as HTMLElement;
    const search = compiled.querySelector<HTMLInputElement>('#familia-search-input');

    expect(search).not.toBeNull();
    search!.value = 'oaxaca';
    search!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-familia .activity-card').length).toBe(1);
    expect(compiled.querySelector('app-familia .activity-card h3')?.textContent).toContain(
      familiaData[0].titulo,
    );
  });

  it('should filter Montana activities by name and place, ignoring accents', async () => {
    const fixture = await createAppFixture('/montana');
    const compiled = fixture.nativeElement as HTMLElement;
    const search = compiled.querySelector<HTMLInputElement>('#activity-search-input');

    expect(search).not.toBeNull();
    search!.value = 'malinche';
    search!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-montana .activity-card').length).toBe(1);
    expect(compiled.querySelector('app-montana .activity-card h3')?.textContent).toContain(
      'La Malinche',
    );

    search!.value = 'Iztaccíhuatl';
    search!.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll('app-montana .activity-card').length).toBe(1);
    expect(compiled.querySelector('app-montana .activity-card h3')?.textContent).toContain(
      'Iztaccíhuatl',
    );
  });

  it('should render navigation items from the menu data', async () => {
    const fixture = await createAppFixture();
    const links = fixture.nativeElement.querySelectorAll('.main-nav a');
    expect(links.length).toBe(navigationData.length);
    expect(links[0].textContent.trim()).toBe('INICIO');
    expect(links[0].getAttribute('href')).toBe('/#inicio');
  });

  it('should render social links from the social links data', async () => {
    const fixture = await createAppFixture();
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
    const fixture = await createAppFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    const moreLink = compiled.querySelector<HTMLAnchorElement>('.main-nav a[href="/#mas"]');
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
    const fixture = await createAppFixture();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.sold-out.is-available')?.textContent.trim()).toBe('DISPONIBLE');
    expect(compiled.querySelectorAll('.sold-out.is-sold-out').length).toBe(2);
  });

  it('should link to the WhatsApp channel instead of asking for an email', async () => {
    const fixture = await createAppFixture();
    const compiled = fixture.nativeElement as HTMLElement;
    const joinLink = compiled.querySelector<HTMLAnchorElement>('.whatsapp-join');

    expect(joinLink?.href).toBe('https://whatsapp.com/channel/0029Va9Mu0yF6sn2kzPNpL3A');
    expect(joinLink?.target).toBe('_blank');
    expect(compiled.querySelector('#newsletter-email')).toBeNull();
  });
});
