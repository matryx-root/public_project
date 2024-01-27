import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-aviso-item',
  templateUrl: './aviso-item.component.html',
  styleUrls: ['./aviso-item.component.scss']
})
export class AvisoItemComponent {
  @Input() aviso!: Aviso;
  @Output() deleteRequest = new EventEmitter<Aviso>();

  onDeleteClick(): void {
    if (this.aviso) {
      this.deleteRequest.emit(this.aviso);
    } else {
      // Manejar el caso de que aviso sea undefined.
      console.error('Error: intento de eliminar un aviso que no está definido.');
    }
  }
}

