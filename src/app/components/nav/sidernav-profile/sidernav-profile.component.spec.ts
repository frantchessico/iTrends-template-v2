import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidernavProfileComponent } from './sidernav-profile.component';

describe('SidernavProfileComponent', () => {
  let component: SidernavProfileComponent;
  let fixture: ComponentFixture<SidernavProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidernavProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidernavProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
