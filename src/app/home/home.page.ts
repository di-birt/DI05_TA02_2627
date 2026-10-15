import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}

  mayorDeEdad(edad: number): boolean {
    return edad >= 18;
  }

  calcularEdad(añoNacimiento: number): number {
    const añoActual = new Date().getFullYear();
    return añoActual - añoNacimiento;
  }

  esMayorDeEdadPorAño(añoNacimiento: number): boolean {
    const edad = this.calcularEdad(añoNacimiento);
    return this.mayorDeEdad(edad);
  }
}
