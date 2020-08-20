import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calories0InputComponent } from './calories-input.component';

describe('Calories0InputComponent', () => {
  let component: Calories0InputComponent;
  let fixture: ComponentFixture<Calories0InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Calories0InputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calories0InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
