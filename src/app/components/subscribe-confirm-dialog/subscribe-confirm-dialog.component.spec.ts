import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeConfirmDialogComponent } from './subscribe-confirm-dialog.component';

describe('SubscribeConfirmDialogComponent', () => {
  let component: SubscribeConfirmDialogComponent;
  let fixture: ComponentFixture<SubscribeConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
