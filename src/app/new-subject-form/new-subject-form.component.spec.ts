import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubjectFormComponent } from './new-subject-form.component';

describe('NewSubjectFormComponent', () => {
  let component: NewSubjectFormComponent;
  let fixture: ComponentFixture<NewSubjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
