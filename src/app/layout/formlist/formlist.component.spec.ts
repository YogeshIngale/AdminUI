import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormListComponent } from './formlist.component';
import { FormListModule } from './formlist.module';

describe('FormComponent', () => {
  let component: FormListComponent;
  let fixture: ComponentFixture<FormListComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
            FormListModule,
          BrowserAnimationsModule,
          RouterTestingModule,
         ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
