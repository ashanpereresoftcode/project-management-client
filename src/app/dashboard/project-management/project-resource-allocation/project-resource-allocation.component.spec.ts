import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResourceAllocationComponent } from './project-resource-allocation.component';

describe('ProjectResourceAllocationComponent', () => {
  let component: ProjectResourceAllocationComponent;
  let fixture: ComponentFixture<ProjectResourceAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectResourceAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectResourceAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
