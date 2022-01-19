import { TestBed } from '@angular/core/testing';

import { ChecklistApiService } from './checklist-api.service';

describe('ChecklistApiService', () => {
  let service: ChecklistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
