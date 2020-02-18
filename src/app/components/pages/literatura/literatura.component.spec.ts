import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraturaComponent } from './literatura.component';

describe('ProdutoresComponent', () => {
  let component: LiteraturaComponent;
  let fixture: ComponentFixture<LiteraturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiteraturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiteraturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
