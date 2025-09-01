import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriasAdminComponent } from './subcategorias-admin.component';

describe('SubcategoriasAdminComponent', () => {
  let component: SubcategoriasAdminComponent;
  let fixture: ComponentFixture<SubcategoriasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoriasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
