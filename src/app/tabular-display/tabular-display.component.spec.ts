import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularDisplayComponent } from './tabular-display.component';

describe('TabularDisplayComponent', () => {
  let component: TabularDisplayComponent;
  let fixture: ComponentFixture<TabularDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabularDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
