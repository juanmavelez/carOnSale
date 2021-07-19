import { TestBed } from '@angular/core/testing';

import { AuctionsService } from './auctions.service';

describe('AuctionsService', () => {
  let service: AuctionsService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionsService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
