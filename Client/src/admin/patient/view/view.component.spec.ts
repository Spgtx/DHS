import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwComponent } from './view.component';

describe('ViewComponent', () => {
  let component: ViewwComponent;
  let fixture: ComponentFixture<ViewwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
