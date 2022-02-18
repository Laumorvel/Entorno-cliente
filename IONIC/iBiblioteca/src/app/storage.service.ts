import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Doc } from './interfaces/Foundation';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  favoritos: Doc[] = [];

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    return await this._storage?.set(key, value);
  }

  async remove(key: string){
    return await this._storage.remove(key);
  }

  async getItem(key:string){
    return await this._storage.get(key);
  }

  async getKeys(){
    return await this._storage.keys()
  }

  async getLength(){
    return await this._storage.length();
  }

  async getFavorites(){
    for (let index = 0; index < localStorage.length; index++) {
      const book = localStorage[index];
      this.favoritos.push(book);
    }
    return this.favoritos;
  }
}
