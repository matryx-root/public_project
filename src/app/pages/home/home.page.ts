import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../../services/aviso.service';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  avisos: Aviso[] = [];

  constructor(private avisoService: AvisoService) {}

  ngOnInit() {
    this.actualizarAvisos();
  }

  async actualizarAvisos() {
    this.avisoService.getAvisos().then(avisos => {
      this.avisos = avisos;
    }).catch(error => {
      console.error('Error al obtener avisos:', error);
      // Puedes manejar errores aquí, como mostrar un mensaje al usuario.
    });
  }

  eliminarAviso(avisoAEliminar: Aviso) {
    if (!confirm('¿Estás seguro de que quieres eliminar este aviso?')) {
      return;
    }

    this.avisoService.deleteAviso(avisoAEliminar.id).then(() => {
      this.actualizarAvisos();
    }).catch(error => {
      console.error('Error al eliminar el aviso', error);
      // Manejar error, por ejemplo, mostrando un mensaje al usuario.
    });
  }
}
