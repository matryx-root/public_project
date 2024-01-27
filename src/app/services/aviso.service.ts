import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Aviso } from '../models/aviso.model';
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisos: Aviso[] = [];

  constructor(private storageService: StorageService, private databaseService: DatabaseService) {
    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      if (this.databaseService.isCordovaAvailable) {
        const dbAvisos = await this.databaseService.loadAvisos();
        if (dbAvisos) {
          this.avisos = dbAvisos;
        }
      } else {
        // Cargar desde StorageService como fallback
        const storedAvisos = await this.storageService.get('avisos');
        if (storedAvisos) {
          this.avisos = storedAvisos;
        }
      }
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
    }
  }

  async getAvisos(): Promise<Aviso[]> {
    try {
      // Cambiar a obtener los avisos desde SQLite
      const dbAvisos = await this.databaseService.getAvisos();
      return dbAvisos ? [...dbAvisos] : [];
    } catch (error) {
      console.error('Error al obtener avisos:', error);
      return [];
    }
  }

  async addAviso(nuevoAviso: Aviso): Promise<void> {
    this.avisos.push(nuevoAviso);
    await this.storageService.set('avisos', this.avisos);
  }

  async updateAviso(avisoActualizado: Aviso): Promise<void> {
    const index = this.avisos.findIndex(aviso => aviso.id === avisoActualizado.id);
    if (index !== -1) {
      this.avisos[index] = avisoActualizado;
      await this.storageService.set('avisos', this.avisos);
    }
  }

  async deleteAviso(id: string): Promise<void> {
    this.avisos = this.avisos.filter(aviso => aviso.id !== id);
    await this.storageService.set('avisos', this.avisos);
  }
}
