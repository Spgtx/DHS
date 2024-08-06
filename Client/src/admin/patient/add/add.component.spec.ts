import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddComponent } from './add.component';

describe('AdddComponent', () => {
  let component: AdddComponent;
  let fixture: ComponentFixture<AdddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
