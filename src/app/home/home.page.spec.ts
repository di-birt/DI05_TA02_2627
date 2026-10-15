import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { HomePage } from './home.page';

// describe agrupa las pruebas relacionadas con una unidad.
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // Se ejecuta antes de cada it para evitar que un test contamine a otro.
  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    // Sin esta llamada, los cambios del componente todavía no se reflejan en el DOM.
    fixture.detectChanges();
  });

  // it describe una sola expectativa de comportamiento.
  it('crea la página', () => {
    // expect inicia la afirmación y toBeTruthy comprueba que existe una instancia.
    expect(component).toBeTruthy();
  });

  describe('Comprobar si es mayor de edad -> mayorDeEdad', () => {
    it('rechaza edades menores de 18', () => {
      // Probabas con la edad 17.
      expect(component.mayorDeEdad(17)).toBe(false);
    });

    it('acepta la edad límite de 18', () => {
      // Se prueba el límite exacto de la regla.
      expect(component.mayorDeEdad(18)).toBe(true);
    });

    it('acepta edades mayores de 18', () => {
      // Un valor superior confirma que la regla no acepta solo el límite.
      expect(component.mayorDeEdad(30)).toBe(true);
    });
  });

  describe('Calcular edad -> calcularEdad', () => {
    it('devuelve la edad actual a partir del año de nacimiento', () => {
      const edad = 25;
      const añoActual = new Date().getFullYear();
      const añoNacimiento = añoActual - edad;

      expect(component.calcularEdad(añoNacimiento)).toBe(25);
    });

    it('permite comprobar la mayoría de edad usando la edad calculada', () => {
      const añoActual = new Date().getFullYear();
      const añoNacimiento = añoActual - 18;
      const edad = component.calcularEdad(añoNacimiento);

      expect(edad).toBe(18);
      expect(component.mayorDeEdad(edad)).toBe(true);
    });
  });

  describe('Comprobar mayoría de edad por año -> esMayorDeEdadPorAño', () => {
    it('devuelve true cuando el año de nacimiento corresponde a una persona mayor de edad', () => {
      const edad = 18;
      const añoActual = new Date().getFullYear();
      const añoNacimiento = añoActual - edad;

      // El método combina calcularEdad y mayorDeEdad internamente.
      expect(component.esMayorDeEdadPorAño(añoNacimiento)).toBe(true);
    });
  });
});
