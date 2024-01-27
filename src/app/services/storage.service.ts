import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    try {
      this._storage = await this.storage.create();
    } catch (error) {
      console.error('Error al inicializar el almacenamiento:', error);
    }
  }

  public async set(key: string, value: any) {
    try {
      await this._storage?.set(key, value);
    } catch (error) {
      console.error(`Error al guardar la clave ${key}:`, error);
    }
  }

  public async get(key: string): Promise<any> {
    try {
      return await this._storage?.get(key);
    } catch (error) {
      console.error(`Error al obtener la clave ${key}:`, error);
      return null;
    }
  }
}
