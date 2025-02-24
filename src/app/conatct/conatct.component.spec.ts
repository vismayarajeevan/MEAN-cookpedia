import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatctComponent } from './conatct.component';

describe('ConatctComponent', () => {
  let component: ConatctComponent;
  let fixture: ComponentFixture<ConatctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConatctComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConatctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
