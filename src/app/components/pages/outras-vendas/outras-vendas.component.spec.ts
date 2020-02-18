import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrasVendasComponent } from './outras-vendas.component';

describe('OutrasVendasComponent', () => {
  let component: OutrasVendasComponent;
  let fixture: ComponentFixture<OutrasVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutrasVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutrasVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
