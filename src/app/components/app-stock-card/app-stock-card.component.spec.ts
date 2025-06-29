import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStockCardComponent } from './app-stock-card.component';

describe('AppStockCardComponent', () => {
  let component: AppStockCardComponent;
  let fixture: ComponentFixture<AppStockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStockCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
