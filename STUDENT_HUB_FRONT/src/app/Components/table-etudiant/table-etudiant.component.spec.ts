import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEtudiantComponent } from './table-etudiant.component';

describe('TableEtudiantComponent', () => {
  let component: TableEtudiantComponent;
  let fixture: ComponentFixture<TableEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
