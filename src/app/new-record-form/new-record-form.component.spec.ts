import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecordFormComponent } from './new-record-form.component';

describe('NewRecordFormComponent', () => {
  let component: NewRecordFormComponent;
  let fixture: ComponentFixture<NewRecordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
