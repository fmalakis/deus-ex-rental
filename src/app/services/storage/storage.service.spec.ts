import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('should set and clear local storage', () => {
    const testPairs = [{ key: 'testKey', value: 'testValue' }];
    storageService.setLocalStorage(testPairs);
    expect(localStorage.getItem('testKey')).toBe('testValue');

    storageService.clearStorage();
    expect(localStorage.getItem('testKey')).toBeNull();
  });

  it('should set and clear session storage', () => {
    const testPairs = [{ key: 'testKey', value: 'testValue' }];
    storageService.setSessionStorage(testPairs);
    expect(sessionStorage.getItem('testKey')).toBe('testValue');

    storageService.clearStorage();
    expect(sessionStorage.getItem('testKey')).toBeNull();
  });

  it('should set isUsingLocalStorage to true when setting local storage', () => {
    const testPairs = [{ key: 'testKey', value: 'testValue' }];
    storageService.setLocalStorage(testPairs);
    expect(storageService.isUsingLocalStorage).toBeTruthy();
  });
});
