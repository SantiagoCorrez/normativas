import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativasPublicoComponent } from './normativas-publico.component';

describe('NormativasPublicoComponent', () => {
  let component: NormativasPublicoComponent;
  let fixture: ComponentFixture<NormativasPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormativasPublicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormativasPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
