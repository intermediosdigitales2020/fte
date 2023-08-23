import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  finalizado: boolean = false;
  paso1Form: FormGroup;
  paso2Form: FormGroup;
  paso3Form: FormGroup;
  form1: boolean;
  form2: boolean;
  form3: boolean;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form1 = true;
    this.form2 = false;
    this.form3 = false;
    this.paso1Form = this.formBuilder.group({
      correoElectronico: ['', Validators.required]
    });
    this.paso2Form = this.formBuilder.group({
      codigoOTP: ['', Validators.required]
    });
    this.paso3Form = this.formBuilder.group({
      correoElectronico: ['', Validators.required],
      CC: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      id_ciudad: ['', Validators.required],
      partido_id: ['', Validators.required],
      miembro_id: ['', Validators.required]
    });
  }

  onSubmitPaso1() {
    this.http.post('http://localhost:3000/registro/paso1', this.paso1Form.value).subscribe((res:any) => {
      console.log(this.paso1Form.value);
      if(res.message == "Código de verificación enviado exitosamente"){
        console.log("Codigo enviado")
        localStorage.setItem("correo", this.paso1Form.value.correoElectronico )
        this.form1 = false;
        this.form2 = true;
      }else{
        console.log("Codigo no enviado")
      }
      // Aquí debes implementar la lógica para manejar la respuesta del servidor
    });
  }

  onSubmitPaso2() {
    const paso2 = {
    "correoElectronico": localStorage.getItem("correo"),
    "codigoOTP": this.paso2Form.value.codigoOTP
    }
    console.log(paso2)
    this.http.post('http://localhost:3000/registro/paso2', paso2).subscribe((res: any) => {
      if(res.message == "Código de verificación válido"){
        console.log("Codigo verificado")
        this.form1 = false;
        this.form2 = false;
        this.form3 = true;
      }else{
        console.log("Codigo no enviado")
      }

      // Aquí debes implementar la lógica para manejar la respuesta del servidor
    });
  }

  onSubmitPaso3() {
    let paso3 = {
      Voluntario_CC:this.paso3Form.value.CC,
      Voluntario_Nombre:this.paso3Form.value.nombre,
      Voluntario_Telefono:this.paso3Form.value.telefono,
      Voluntario_Direccion:this.paso3Form.value.direccion,
      Voluntario_Ciudad_ID: 6,
      Voluntario_Email:localStorage.getItem("correo"),
      Voluntario_Partido_ID:9,
      Voluntario_Miembro_ID:1,
      Voluntario_Token:null,
      Voluntario_Aprobado:false,
      Voluntario_Activo:false,
      Voluntario_Tipo_ID:1,
      Voluntario_Commentarios:"Ninguno",
      Voluntario_Estatus_ID:1
    }
    console.log(paso3)
    this.http.post('http://localhost:3000/registro/paso3', paso3).subscribe((res: any) => {
  console.log(res);
  
  if (res.message == "Voluntario registrado exitosamente") {
    this.finalizado = true;
    this.form3 = false;
  } else {
    alert("Ha habido un error en tus datos, vuelve a intentarlo.");
  }
});

  }
}
