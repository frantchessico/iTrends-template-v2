import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadosComponent } from './patrocinados.component';

describe('PatrocinadosComponent', () => {
  let component: PatrocinadosComponent;
  let fixture: ComponentFixture<PatrocinadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrocinadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrocinadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
