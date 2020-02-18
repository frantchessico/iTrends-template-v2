import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelularesTabletsComponent } from './celulares-tablets.component';

describe('ArtistaComponent', () => {
  let component: CelularesTabletsComponent;
  let fixture: ComponentFixture<CelularesTabletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelularesTabletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelularesTabletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
