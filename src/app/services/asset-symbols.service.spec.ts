import { TestBed } from '@angular/core/testing';

import { AssetSymbolsService } from './asset-symbols.service';

describe('AssetSymbolsService', () => {
  let service: AssetSymbolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetSymbolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
