/* eslint-disable max-classes-per-file */
interface IStorage {
  // eslint-disable-next-line no-unused-vars
  getItem(key: string): string | null;
  // eslint-disable-next-line no-unused-vars
  setItem(key: string, value: string): void;
  // eslint-disable-next-line no-unused-vars
  removeItem(key: string): void;
}

abstract class Storage {
  isStorageEnabled: boolean;

  storage: IStorage;

  constructor(storage: IStorage) {
    this.isStorageEnabled = false;
    this.storage = storage;
  }

  public set(key: string, value: string): void {
    if (this.isStorageEnabled) {
      this.storage.setItem(key, value);
    }
  }

  public get(key: string): string | null {
    return this.isStorageEnabled ? this.storage.getItem(key) : null;
  }

  public remove(key: string) {
    if (this.isStorageEnabled) {
      this.storage.removeItem(key);
    }
  }

  protected test() {
    const test = 'test';
    try {
      this.storage.setItem(test, test);
      this.storage.removeItem(test);
      this.isStorageEnabled = true;
    } catch (e) {
      this.isStorageEnabled = false;
    }
  }
}

class LocalStorage extends Storage {
  constructor() {
    super(window.localStorage);
    try {
      this.test();
    } catch (e) {
      this.isStorageEnabled = false;
    }
  }
}

class SessionStorage extends Storage {
  constructor() {
    super(window.sessionStorage);
    try {
      this.test();
    } catch (e) {
      this.isStorageEnabled = false;
    }
  }
}

export const local = new LocalStorage();
export const session = new SessionStorage();
