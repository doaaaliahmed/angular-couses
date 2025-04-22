import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAlertMessageComponent } from './error-alert-message.component';

describe('ErrorAlertMessageComponent', () => {
  let component: ErrorAlertMessageComponent;
  let fixture: ComponentFixture<ErrorAlertMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAlertMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorAlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
