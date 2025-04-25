import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeformanceCardComponent } from './peformance-card.component';

describe('PeformanceCardComponent', () => {
  let component: PeformanceCardComponent;
  let fixture: ComponentFixture<PeformanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeformanceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeformanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
