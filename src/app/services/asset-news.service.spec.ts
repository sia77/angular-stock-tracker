import { TestBed } from '@angular/core/testing';

import { AssetNewsService } from './asset-news.service';

describe('AssetNewsService', () => {
  let service: AssetNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
