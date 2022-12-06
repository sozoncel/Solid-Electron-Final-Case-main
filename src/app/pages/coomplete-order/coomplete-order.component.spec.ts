import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoompleteOrderComponent } from './coomplete-order.component';

describe('CoompleteOrderComponent', () => {
  let component: CoompleteOrderComponent;
  let fixture: ComponentFixture<CoompleteOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoompleteOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoompleteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
