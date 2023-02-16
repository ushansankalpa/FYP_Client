import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LSIdentiferTestComponent } from './lsidentifer-test.component';

describe('LSIdentiferTestComponent', () => {
  let component: LSIdentiferTestComponent;
  let fixture: ComponentFixture<LSIdentiferTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LSIdentiferTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LSIdentiferTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
