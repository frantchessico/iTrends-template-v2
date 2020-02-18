import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobiliarioComponent } from './mobiliario.component';

describe('MobiliarioComponent', () => {
  let component: MobiliarioComponent;
  let fixture: ComponentFixture<MobiliarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobiliarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobiliarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
