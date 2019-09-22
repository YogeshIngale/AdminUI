import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIoComponent } from './form-io.component';

describe('FormIoComponent', () => {
  let component: FormIoComponent;
  let fixture: ComponentFixture<FormIoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
