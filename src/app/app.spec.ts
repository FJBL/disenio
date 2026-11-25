import { TestBed } from '@angular/core/testing';
import { App } from './app';
import difficultyLevelsData from './difficulty-levels.json';
import adventuresData from './adventures.json';
import navigationData from './navigation.json';

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
