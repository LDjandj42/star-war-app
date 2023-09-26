import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSpeciesComponent } from './detail-species.component';

describe('DetailSpeciesComponent', () => {
  let component: DetailSpeciesComponent;
  let fixture: ComponentFixture<DetailSpeciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailSpeciesComponent]
    });
    fixture = TestBed.createComponent(DetailSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
