import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePlayComponent } from './multiple-play.component';

describe('MultiplePlayComponent', () => {
  let component: MultiplePlayComponent;
  let fixture: ComponentFixture<MultiplePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplePlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiplePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
