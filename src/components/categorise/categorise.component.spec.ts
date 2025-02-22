import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriseComponent } from './categorise.component';

describe('CategoriseComponent', () => {
  let component: CategoriseComponent;
  let fixture: ComponentFixture<CategoriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
