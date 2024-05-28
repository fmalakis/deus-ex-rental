import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setLocalStorage(pairs: StorageKeyValuePairs[]): void {
    pairs.forEach((pair) => localStorage.setItem(pair.key, pair.value));
  }

  setSessionStorage(pairs: StorageKeyValuePairs[]): void {
    pairs.forEach((pair) => sessionStorage.setItem(pair.key, pair.value));
  }

  clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export type StorageKeyValuePairs = {
    key: string,
    value: string
}
