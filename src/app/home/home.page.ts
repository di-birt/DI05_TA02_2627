import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { EdadService } from './edad.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage {
  anyoNacimiento = 2000;
  resultado = '';

  private readonly edadService = inject(EdadService);

  mayorDeEdad(edad: number): boolean {
    return this.edadService.esMayorDeEdad(edad);
  }

  calcularEdad(anyoNacimiento: number): number {
    return this.edadService.calcularEdad(anyoNacimiento);
  }

  esMayorDeEdadPorAño(anyoNacimiento: number): boolean {
    const edad = this.calcularEdad(anyoNacimiento);
    return this.mayorDeEdad(edad);
  }

  comprobarEdad(): void {
    const edad = this.calcularEdad(this.anyoNacimiento);
    this.resultado = this.mayorDeEdad(edad)
      ? `Tiene ${edad} años y es mayor de edad.`
      : `Tiene ${edad} años y es menor de edad.`;
  }
}
