import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativaDetailComponent } from './normativa-detail.component';

describe('NormativaDetailComponent', () => {
  let component: NormativaDetailComponent;
  let fixture: ComponentFixture<NormativaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormativaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormativaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
