import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDateComponent } from './to-date.component';

describe('ToDateComponent', () => {
  let component: ToDateComponent;
  let fixture: ComponentFixture<ToDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
