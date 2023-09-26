import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpeciesComponent } from './list-species.component';

describe('ListSpeciesComponent', () => {
  let component: ListSpeciesComponent;
  let fixture: ComponentFixture<ListSpeciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSpeciesComponent]
    });
    fixture = TestBed.createComponent(ListSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
