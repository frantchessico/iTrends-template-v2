import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaLinhaComponent } from './nova-linha.component';

describe('NovaLinhaComponent', () => {
  let component: NovaLinhaComponent;
  let fixture: ComponentFixture<NovaLinhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaLinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
