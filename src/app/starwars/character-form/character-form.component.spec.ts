import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormComponent } from './character-form.component';

describe('CharacterFormComponent', () => {
  let component: CharacterFormComponent;
  let fixture: ComponentFixture<CharacterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterFormComponent]
    });
    fixture = TestBed.createComponent(CharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
