import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageContentComponent } from './home-page-content.component';

describe('HomePageContentComponent', () => {
  let component: HomePageContentComponent;
  let fixture: ComponentFixture<HomePageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
