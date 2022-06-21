import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMeetingComponent } from './post-meeting.component';

describe('PostMeetingComponent', () => {
  let component: PostMeetingComponent;
  let fixture: ComponentFixture<PostMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
