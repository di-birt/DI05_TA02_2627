import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HomePage } from './home.page';
import { EdadService } from './edad.service';

// describe agrupa las pruebas relacionadas con una unidad.
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // Se ejecuta antes de cada it para evitar que un test contamine a otro.
  beforeEach(() => {
    // TestBed crea la instancia como lo haria Angular en la aplicacion.
    // Aqui probamos el componente directamente, sin pulsar el boton del HTML.
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    // Sin esta llamada, los cambios del componente todavia no se reflejan en el DOM.
    // Los tests de este archivo no consultan el DOM, pero la plantilla queda preparada.
    fixture.detectChanges();
  });

  // it describe una sola expectativa de comportamiento.
  it('crea la página', () => {
    // expect inicia la afirmación y toBeTruthy comprueba que existe una instancia.
    expect(component).toBeTruthy();
  });

  describe('Comprobar si es mayor de edad -> mayorDeEdad', () => {
    it('rechaza edades menores de 18', () => {
      // En la aplicacion, este metodo se alcanzaria desde comprobarEdad().
      // En un test unitario lo llamamos directamente para aislar esta regla.
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
      const anyoActual = new Date().getFullYear();
      const anyoNacimiento = anyoActual - edad;

      expect(component.calcularEdad(anyoNacimiento)).toBe(25);
    });

    it('permite comprobar la mayoría de edad usando la edad calculada', () => {
      const anyoActual = new Date().getFullYear();
      const anyoNacimiento = anyoActual - 18;
      const edad = component.calcularEdad(anyoNacimiento);

      expect(edad).toBe(18);
      expect(component.mayorDeEdad(edad)).toBe(true);
    });
  });

  describe('Comprobar mayoría de edad por año -> esMayorDeEdadPorAño', () => {
    it('devuelve true cuando el año de nacimiento corresponde a una persona mayor de edad', () => {
      const edad = 18;
      const anyoActual = new Date().getFullYear();
      const anyoNacimiento = anyoActual - edad;

      // El método combina calcularEdad y mayorDeEdad internamente.
      expect(component.esMayorDeEdadPorAño(anyoNacimiento)).toBe(true);
    });

    it('usa spies para observar sus colaboraciones internas', () => {
      // spyOn conserva la implementacion real: solo registra las llamadas.
      const calcularEdadSpy = vi.spyOn(component, 'calcularEdad');
      const mayorDeEdadSpy = vi.spyOn(component, 'mayorDeEdad');
      const anyoNacimiento = new Date().getFullYear() - 20;

      // Se ejecuta la logica real de esMayorDeEdadPorAño(), no una simulacion.
      expect(component.esMayorDeEdadPorAño(anyoNacimiento)).toBe(true);
      // Ademas del resultado, comprobamos como colaboran los metodos internos.
      expect(calcularEdadSpy).toHaveBeenCalledWith(anyoNacimiento);
      expect(mayorDeEdadSpy).toHaveBeenCalledWith(20);
    });
  });
});

describe('HomePage con un mock de EdadService', () => {
  it('permite controlar la respuesta de la dependencia', () => {
    // El mock reemplaza al servicio real para que el test controle sus respuestas.
    // vi.fn() crea funciones falsas que tambien permiten verificar sus llamadas.
    const edadServiceMock = {
      calcularEdad: vi.fn().mockReturnValue(42),
      esMayorDeEdad: vi.fn().mockReturnValue(true),
    };

    TestBed.configureTestingModule({
      imports: [HomePage],
      // Cuando HomePage pida EdadService mediante inject(), recibira este mock.
      providers: [{ provide: EdadService, useValue: edadServiceMock }],
    });

    const fixture = TestBed.createComponent(HomePage);
    const component = fixture.componentInstance;

    // El resultado depende de los valores del mock, no de la fecha actual.
    expect(component.esMayorDeEdadPorAño(2000)).toBe(true);
    // Verificamos que el componente haya usado correctamente la dependencia.
    expect(edadServiceMock.calcularEdad).toHaveBeenCalledWith(2000);
    expect(edadServiceMock.esMayorDeEdad).toHaveBeenCalledWith(42);
  });
});
