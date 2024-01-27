import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {
  transform(value: Date | string, formato: string = 'es-ES'): string {
    let fecha: Date;

    if (value instanceof Date) {
      fecha = value;
    } else {
      fecha = new Date(value);
    }

    // Verificar si la fecha es válida
    if (isNaN(fecha.getTime())) {
      return 'Fecha inválida';
    }

    // Formatear la fecha según el formato proporcionado
    switch (formato) {
      case 'es-ES':
        return fecha.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
      // Puedes agregar más formatos aquí
      default:
        return fecha.toLocaleDateString(formato);
    }
  }
}
