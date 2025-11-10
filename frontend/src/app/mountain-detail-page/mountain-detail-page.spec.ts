import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainDetailPage } from './mountain-detail-page';

describe('MountainDetailPage', () => {
  let component: MountainDetailPage;
  let fixture: ComponentFixture<MountainDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountainDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
