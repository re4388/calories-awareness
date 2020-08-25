import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeConfirmDialogComponent } from './unsubscribe-confirm-dialog.component';

describe('UnsubscribeConfirmDialogComponent', () => {
  let component: UnsubscribeConfirmDialogComponent;
  let fixture: ComponentFixture<UnsubscribeConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribeConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
