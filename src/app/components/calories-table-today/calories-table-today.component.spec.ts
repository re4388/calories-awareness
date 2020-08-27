import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesTableTodayComponent } from './calories-table-today.component';

describe('CaloriesTableTodayComponent', () => {
  let component: CaloriesTableTodayComponent;
  let fixture: ComponentFixture<CaloriesTableTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaloriesTableTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaloriesTableTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
