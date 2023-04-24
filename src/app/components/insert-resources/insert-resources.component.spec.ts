import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertResourcesComponent } from './insert-resources.component';

describe('InsertResourcesComponent', () => {
  let component: InsertResourcesComponent;
  let fixture: ComponentFixture<InsertResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
