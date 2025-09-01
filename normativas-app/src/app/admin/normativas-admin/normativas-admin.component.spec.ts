import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativasAdminComponent } from './normativas-admin.component';

describe('NormativasAdminComponent', () => {
  let component: NormativasAdminComponent;
  let fixture: ComponentFixture<NormativasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormativasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormativasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
