import { TestBed, inject } from '@angular/core/testing';

import { HeroModule=appService } from './hero--module=app.service';

describe('HeroModule=appService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroModule=appService]
    });
  });

  it('should be created', inject([HeroModule=appService], (service: HeroModule=appService) => {
    expect(service).toBeTruthy();
  }));
});
