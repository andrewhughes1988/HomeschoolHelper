import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecordDialogComponent } from './view-record-dialog.component';

describe('ViewRecordDialogComponent', () => {
  let component: ViewRecordDialogComponent;
  let fixture: ComponentFixture<ViewRecordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
