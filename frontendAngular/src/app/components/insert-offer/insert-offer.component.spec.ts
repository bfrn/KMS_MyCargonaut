import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOfferComponent } from './insert-offer.component';

describe('InsertOfferComponent', () => {
  let component: InsertOfferComponent;
  let fixture: ComponentFixture<InsertOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
