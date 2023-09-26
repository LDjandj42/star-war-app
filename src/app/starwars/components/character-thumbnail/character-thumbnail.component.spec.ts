import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterThumbnailComponent } from './character-thumbnail.component';

describe('CharacterThumbnailComponent', () => {
  let component: CharacterThumbnailComponent;
  let fixture: ComponentFixture<CharacterThumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterThumbnailComponent]
    });
    fixture = TestBed.createComponent(CharacterThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
