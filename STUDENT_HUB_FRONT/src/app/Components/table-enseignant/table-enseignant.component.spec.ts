import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEnseignantComponent } from './table-enseignant.component';

describe('TableEnseignantComponent', () => {
  let component: TableEnseignantComponent;
  let fixture: ComponentFixture<TableEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
