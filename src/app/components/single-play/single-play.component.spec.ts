import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlayComponent } from './single-play.component';

describe('SinglePlayComponent', () => {
  let component: SinglePlayComponent;
  let fixture: ComponentFixture<SinglePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
