import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadMyRecordsComponent } from './download-my-records.component';

describe('DownloadMyRecordsComponent', () => {
  let component: DownloadMyRecordsComponent;
  let fixture: ComponentFixture<DownloadMyRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadMyRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadMyRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
