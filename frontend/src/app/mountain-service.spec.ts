import { TestBed } from '@angular/core/testing';
import { MountainService } from './mountain-service';
import axios from 'axios';

describe('MountainService (Jasmine)', () => {
  let service: MountainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MountainService);
    localStorage.setItem('token', 'test-token');
    spyOn(axios, 'get');
    spyOn(axios, 'post');
    spyOn(axios, 'put');
    spyOn(axios, 'delete');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should fetch mountains', async () => {
    const mockResponse = {
      data: {
        data: [{ id: 1, name: 'Everest' }],
        current_page: 1,
        last_page: 1
      }
    };

    (axios.get as jasmine.Spy).and.resolveTo(mockResponse);

    await service.queryMountains();

    expect(service.mountains().length).toBe(1);
  });
});
