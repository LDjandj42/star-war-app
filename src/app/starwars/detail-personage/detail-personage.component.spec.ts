import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonageComponent } from './detail-personage.component';

describe('DetailPersonageComponent', () => {
  let component: DetailPersonageComponent;
  let fixture: ComponentFixture<DetailPersonageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPersonageComponent]
    });
    fixture = TestBed.createComponent(DetailPersonageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
