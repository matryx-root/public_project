import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Aviso } from '../models/aviso.model';

interface CustomWindow {
  cordova?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public isCordovaAvailable: boolean;
  constructor(private sqlite: SQLite) {
    this.isCordovaAvailable = !!window.cordova;
  }

  public getIsCordovaAvailable(): boolean {
    return this.isCordovaAvailable;
  }

  async loadAvisos(): Promise<Aviso[]> {
    // Crear la base de datos con la configuración necesaria
    const db: SQLiteObject = await this.sqlite.create({
      name: 'mydatabase.db', // Nombre de la base de datos
      location: 'default'    // Ubicación de la base de datos
    });

    const query = 'SELECT * FROM avisos'; // Ajusta la consulta según tu esquema de base de datos
    const result = await db.executeSql(query, []);
    const avisos: Aviso[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      avisos.push(result.rows.item(i));
    }
    return avisos;
  }


  async getAvisos(): Promise<Aviso[]> {
    const db: SQLiteObject = await this.sqlite.create({
      name: 'mydatabase.db',
      location: 'default'
    });
    const query = 'SELECT * FROM avisos';
    const result = await db.executeSql(query, []);
    const avisos: Aviso[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      avisos.push(result.rows.item(i));
    }
    return avisos;
  }

  initializeDatabase() {
    // Verificar si 'window' tiene la propiedad 'cordova'
    const customWindow = window as CustomWindow & typeof globalThis;
    if (customWindow.cordova) {
      this.sqlite.create({
        name: 'mydatabase.db', // Asegúrate de usar el mismo nombre de base de datos aquí
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS avisos (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descripcion TEXT)', [])
            .then(() => console.log('Tabla de avisos creada con éxito'))
            .catch(error => console.error('Error al crear la tabla de avisos', error));
        })
        .catch(error => console.error('Error al abrir la base de datos', error));
    } else {
      console.warn('La aplicación se está ejecutando en un navegador web. El complemento SQLite no funcionará en este entorno.');
    }
  }
}
