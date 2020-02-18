import { TestBed } from '@angular/core/testing';

import { ProfiledaApiService } from './profileda-api.service';

describe('ProfiledaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfiledaApiService = TestBed.get(ProfiledaApiService);
    expect(service).toBeTruthy();
  });
});
