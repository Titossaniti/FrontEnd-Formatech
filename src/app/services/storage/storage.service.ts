import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    } else {
      console.warn('localStorage n\'est pas disponible.');
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    } else {
      console.warn('localStorage n\'est pas disponible.');
    }
  }

  setUserRole(role: string): void {
    this.setItem('user_role', role);
  }

  getUserRole(): string | null {
    return this.getItem('user_role');
  }

  setUser(user: { id: string, role: string, establishment: string | null }): void {
    this.setItem('user', JSON.stringify(user));
  }

  getUser(): { id: string, role: string, establishment: string | null } | null {
    const user = this.getItem('user');
    return user ? JSON.parse(user) : null;
  }


  removeUser(): void {
    this.removeItem('user');
  }

}
