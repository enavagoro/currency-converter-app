import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) { 
      this.loginForm = this.formBuilder.group({
        email : ['',[Validators.required]],
        password : ['',Validators.required]
      }); 
  }

  login(){
    this.authService.logUser(this.loginForm.value).subscribe(result => {
      if(result.isAdmin == true){
        this.authService.setAdminBoolean()
      }
      this.storageService.setItem('session', result)
      alert('Sesión iniciada correctamente')
      this.routeTo('convert') 
    }, err=>{
      alert('Correo no existe o contraseña incorrecta')
    })
  }

  routeTo(route: string){
    this.router.navigate([`/${route}`])
  }
}
