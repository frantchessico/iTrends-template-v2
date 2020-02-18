import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallDevicesComponent } from './small-devices.component';

describe('SmallDevicesComponent', () => {
  let component: SmallDevicesComponent;
  let fixture: ComponentFixture<SmallDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
