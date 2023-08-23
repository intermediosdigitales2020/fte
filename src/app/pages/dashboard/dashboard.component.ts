import { Component, OnInit } from '@angular/core';
import { VoluntariosService } from '../../services/voluntarios.service'

interface Voluntario {
  Voluntario_ID: number;
  Voluntario_Nombre: string;
  Voluntario_Email: string;
  Voluntario_Telefono: string;
  Voluntario_Direccion: string;
  Voluntario_Ciudad_ID: number;
  // ... otras propiedades según necesites ...
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  noAprobados: Voluntario[] = [];
  aprobados: Voluntario[] = [];
  isModalOpen = false;
  voluntarioSeleccionado: Voluntario | null = null;


  constructor(private voluntariosService: VoluntariosService) { }

  ngOnInit(): void {
    this.voluntariosService.getNoAprobados().subscribe(data => {
      this.noAprobados = data;
    });

    this.voluntariosService.getAprobados().subscribe(data => {
      this.aprobados = data;
    });
  }
  abrirModal(voluntario: Voluntario) {
    this.isModalOpen = true;
    this.voluntarioSeleccionado = voluntario;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.voluntarioSeleccionado = null;
  }

  aprobarVoluntario() {
    if (this.voluntarioSeleccionado) {
      // Llama al servicio para aprobar el voluntario
      this.voluntariosService.cambiarAprobacion(this.voluntarioSeleccionado.Voluntario_ID, true).subscribe(() => {
        this.cerrarModal();
        // Actualizar las listas de aprobados y no aprobados o dar una retroalimentación al usuario
      });
    }
  }

  rechazarVoluntario() {
    if (this.voluntarioSeleccionado) {
      // Llama al servicio para rechazar el voluntario
      this.voluntariosService.cambiarAprobacion(this.voluntarioSeleccionado.Voluntario_ID, false).subscribe(() => {
        this.cerrarModal();
        // Actualizar las listas de aprobados y no aprobados o dar una retroalimentación al usuario
      });
    }
  }
}