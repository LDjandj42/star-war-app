import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonageComponent } from './list-personage.component';

describe('ListPersonageComponent', () => {
  let component: ListPersonageComponent;
  let fixture: ComponentFixture<ListPersonageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPersonageComponent]
    });
    fixture = TestBed.createComponent(ListPersonageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
