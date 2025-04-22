import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessAlertMessageComponent } from './sucess-alert-message.component';

describe('SucessAlertMessageComponent', () => {
  let component: SucessAlertMessageComponent;
  let fixture: ComponentFixture<SucessAlertMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucessAlertMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessAlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
