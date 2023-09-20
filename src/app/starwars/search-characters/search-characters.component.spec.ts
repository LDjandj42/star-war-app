import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcharactersComponent } from './search-characters.component';

describe('SearchcharactersComponent', () => {
  let component: SearchcharactersComponent;
  let fixture: ComponentFixture<SearchcharactersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchcharactersComponent]
    });
    fixture = TestBed.createComponent(SearchcharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
