import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsComponentComponent } from './participants-component.component';

describe('ParticipantsComponentComponent', () => {
  let component: ParticipantsComponentComponent;
  let fixture: ComponentFixture<ParticipantsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
