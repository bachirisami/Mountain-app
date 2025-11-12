import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { MountainService } from '../mountain-service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let mountainService: jasmine.SpyObj<MountainService>;
  let mountainsSignal = signal([] as any[]);

  const mockMountains = [
    { id: 1, name: 'Mount Everest', location: 'Nepal', image_url: 'https://example.com/everest.jpg' },
    { id: 2, name: 'K2', location: 'Pakistan', image_url: 'https://example.com/k2.jpg' },
  ];

  beforeEach(async () => {
    mountainsSignal = signal(mockMountains);

    const mountainServiceSpy = jasmine.createSpyObj('MountainService', ['queryMountains'], {
      mountains: mountainsSignal
    });

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: MountainService, useValue: mountainServiceSpy },
        provideRouter([])
      ]
    }).compileComponents();

    mountainService = TestBed.inject(MountainService) as jasmine.SpyObj<MountainService>;
    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchName()).toBe('');
    expect(component.currentPage()).toBe(1);
    expect(component.totalPages()).toBe(1);
  });

  it('should load mountains on initialization', async () => {
    mountainService.queryMountains.and.resolveTo({ last_page: 3, current_page: 1 });

    await component.loadMountains();

    expect(mountainService.queryMountains).toHaveBeenCalledWith({
      name: '',
      page: 1
    });
    expect(component.totalPages()).toBe(3);
  });

  it('should update search filter', () => {
    component.searchName.set('Everest');
    expect(component.searchName()).toBe('Everest');
  });

  it('should go to next page when not on last page', async () => {
    component.totalPages.set(5);
    component.currentPage.set(2);
    mountainService.queryMountains.and.resolveTo({ last_page: 5, current_page: 3 });

    await component.nextPage();

    expect(component.currentPage()).toBe(3);
  });

  it('should not go to next page when on last page', async () => {
    component.totalPages.set(3);
    component.currentPage.set(3);

    await component.nextPage();

    expect(component.currentPage()).toBe(3);
    expect(mountainService.queryMountains).not.toHaveBeenCalled();
  });

  it('should go to previous page when not on first page', async () => {
    component.currentPage.set(3);
    mountainService.queryMountains.and.resolveTo({ last_page: 5, current_page: 2 });

    await component.prevPage();

    expect(component.currentPage()).toBe(2);
  });

  it('should not go to previous page when on first page', async () => {
    component.currentPage.set(1);

    await component.prevPage();

    expect(component.currentPage()).toBe(1);
    expect(mountainService.queryMountains).not.toHaveBeenCalled();
  });

  it('should disable previous button on first page', async () => {
    mountainService.queryMountains.and.resolveTo({ last_page: 1, current_page: 1 });
    component.currentPage.set(1);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const prevButton = Array.from(buttons).find((btn: any) => btn.textContent.trim() === 'Previous') as HTMLButtonElement;

    expect(prevButton.disabled).toBe(true);
  });

  it('should disable next button on last page', async () => {
    mountainService.queryMountains.and.resolveTo({ last_page: 3, current_page: 3 });
    component.currentPage.set(3);
    component.totalPages.set(3);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    const nextButton = Array.from(buttons).find((btn: any) => btn.textContent.trim() === 'Next') as HTMLButtonElement;

    expect(nextButton.disabled).toBe(true);
  });
});
