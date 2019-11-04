import { Component, OnInit } from '@angular/core';
import { Citas } from './models/citas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  citasArray: Citas[] = [];
  horaArray = [];
  selectedDuracion = '30';
  selectCitas: Citas = new Citas();
  cont23 = 0;
  // tslint:disable-next-line: quotemark
  fecha: any = "";
  suma2 = 0;

  ngOnInit() {
    this.cargarfecha();
    this.configurarTiempo();
  }

  cargarfecha() {
    const fechas = new Date();
    const anio = fechas.getFullYear();
    const mes = fechas.getMonth() + 1;
    const dia = fechas.getDate();
    this.suma2 = anio + mes + dia;
  }

  configurarTiempo() {
    this.horaArray.length = 0;
    let a = 8;
    this.horaArray.push(a + ':00');
    while (a < 18) {
      let c = '';
      let b = 0;
      let d = 0;
      let hora;
      console.log(a);
      while (b < 60) {
        // tslint:disable-next-line: radix
        b += parseInt(this.selectedDuracion);
        if (b === 60) {
          c = '00';
          hora = a + 1 + ':' + c;
          hora = hora.toString();
          this.horaArray.push(hora);
          // console.log(hora);
        }
        if (b < 60) {
          hora = a + ':' + b;
          hora = hora.toString();
          this.horaArray.push(hora);
          // console.log(hora);
        }
        if (b > 60) {
          d = 60 - b;
          if (d < 0) {
            d = d * -1;
          }
          a = a + 1;
          hora = a + ':' + d;
          hora = hora.toString();
          this.horaArray.push(hora);
          b = d;
        }
      }
      b = 0;
      a += 1;
    }
  }
  save() {
    const caja = document.getElementById('caja');
    caja.setAttribute('style', 'display:none;transition:all .2s ease-out');
    this.cont23 = 0;
    this.configurarTiempo();
  }

  adddata() {
    this.selectCitas.id = this.citasArray.length + 1;
    let contfecha = 0;
    let conthora = 0;
    this.fecha = this.selectCitas.fecha;
    // tslint:disable-next-line: max-line-length
    if (
      this.selectCitas.nombre &&
      this.selectCitas.primerapellido &&
      this.selectCitas.segundoapellido &&
      this.selectCitas.telefono &&
      this.selectCitas.fecha &&
      this.selectCitas.hora
    ) {
      this.fecha = this.fecha.split('-');
      const suma =
        // tslint:disable-next-line: radix
        parseInt(this.fecha[0]) +
        // tslint:disable-next-line: radix
        parseInt(this.fecha[1]) +
        // tslint:disable-next-line: radix
        parseInt(this.fecha[2]);

      if (this.suma2 > suma) {
        Swal.fire({
          title: 'Upps',
          text: 'Por favor selecionar una fecha correcta',
          type: 'error',
          confirmButtonText: 'Atras'
        });
        return false;
      }

      // recorremos el array y validamos la fecha
      this.citasArray.forEach(element1 => {
        if (element1.fecha === this.selectCitas.fecha) {
          contfecha += 1;
        }
      });
      if (contfecha > 0) {
        // si la fecha tiene citas agendada validamos la hora para que no se repitan
        this.citasArray.forEach(element2 => {
          if (element2.hora === this.selectCitas.hora) {
            conthora += 1;
          }
        });

        if (conthora > 0) {
          Swal.fire({
            title: 'Upps',
            text: 'Lo sentimos no tenemos disponibilidad para esa hora',
            type: 'warning',
            confirmButtonText: 'Atras'
          });
        } else {
          this.citasArray.push(this.selectCitas);
          this.selectCitas = new Citas();
          Swal.fire({
            title: 'Aprovado',
            text: 'Su cita fue agendada correctamente',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }
      } else {
        this.citasArray.push(this.selectCitas);
        this.selectCitas = new Citas();
        Swal.fire({
          title: 'Aprovado',
          text: 'Su cita fue agendada correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      // alert('Por favor llenar todos los campos');
      Swal.fire({
        title: 'Error!',
        text: 'Por favor llenar todos los campos',
        type: 'error',
        confirmButtonText: 'Atras'
      });
    }
  }

  // ---
  mostra_ocultar() {
    this.cont23 += 1;
    const caja = document.getElementById('caja');
    if (this.cont23 === 1) {
      caja.setAttribute('style', 'position: absolute;right:0;width:300px;');
    }
    if (this.cont23 > 1) {
      caja.setAttribute('style', 'display:none;transition:all .2s ease-out');
      this.cont23 = 0;
    }
  }
}
