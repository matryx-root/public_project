// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AvisoItemComponent } from '../components/aviso-item/aviso-item.component';
import { FechaPipe } from '../pipes/fecha.pipe';

@NgModule({
  declarations: [
    AvisoItemComponent,
    FechaPipe // Añade el pipe aquí
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AvisoItemComponent,
    FechaPipe // Exporta el pipe para que esté disponible en otros módulos
  ]
})
export class SharedModule {}
