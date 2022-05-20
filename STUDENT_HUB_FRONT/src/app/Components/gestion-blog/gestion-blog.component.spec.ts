import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBlogComponent } from './gestion-blog.component';

describe('GestionBlogComponent', () => {
  let component: GestionBlogComponent;
  let fixture: ComponentFixture<GestionBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
