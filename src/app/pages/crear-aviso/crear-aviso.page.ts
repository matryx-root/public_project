import { Component } from '@angular/core';
import { AvisoService } from '../../services/aviso.service';
import { Aviso } from '../../models/aviso.model';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: 'crear-aviso.page.html',
  styleUrls: ['crear-aviso.page.scss'],
})
export class CrearAvisoPage {
  public aviso: Aviso = {
    id: '',
    titulo: '',
    descripcion: '',
    fecha: new Date().toISOString(),
    imagenUrl: ''
  };

  constructor(
    private avisoService: AvisoService,
    private navController: NavController
  ) {}

  navegarAHome() {
    this.navController.navigateBack('/home');
  }

  async crearAviso() {
    try {
      if (!this.aviso.titulo || !this.aviso.descripcion) {
        console.error('Error: El título y la descripción son obligatorios');
        return;
      }

      this.aviso.id = this.generateUUID();
      await this.avisoService.addAviso(this.aviso);
      this.resetForm();
      this.navController.navigateBack('/home');
    } catch (error) {
      console.error('Error al crear el aviso', error);
    }
  }

  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      this.aviso.imagenUrl = imagen.webPath;
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  private generateUUID(): string {
    return 'uuid-' + Math.random().toString(36).substring(2, 15);
  }

  private resetForm() {
    this.aviso = {
      id: '',
      titulo: '',
      descripcion: '',
      fecha: new Date().toISOString(),
      imagenUrl: ''
    };
  }
}
