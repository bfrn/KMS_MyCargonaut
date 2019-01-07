import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingOffersComponent } from './driving-offers.component';

describe('DrivingOffersComponent', () => {
  let component: DrivingOffersComponent;
  let fixture: ComponentFixture<DrivingOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivingOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
