import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemAdminComponent } from './listagem-admin.component';

describe('ListagemAdminComponent', () => {
  let component: ListagemAdminComponent;
  let fixture: ComponentFixture<ListagemAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
