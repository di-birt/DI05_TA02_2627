import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EdadService {
  calcularEdad(anyoNacimiento: number): number {
    return new Date().getFullYear() - anyoNacimiento;
  }

  esMayorDeEdad(edad: number): boolean {
    return edad >= 18;
  }
}