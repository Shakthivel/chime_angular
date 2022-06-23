import { TestBed } from '@angular/core/testing';

import { JoinMeetingService } from './join-meeting.service';

describe('JoinMeetingService', () => {
  let service: JoinMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoinMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
