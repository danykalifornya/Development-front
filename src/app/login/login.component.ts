import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService }         from '../services/auth.service';
import { GeneralService }         from '../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  encapsulation: ViewEncapsulation.None // to apply css style to body
})

export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({});
  msgs: Message[] = [];

  constructor(
    private authService: AuthService,
    public fb: FormBuilder,
    private router: Router
  ){}

  ngOnInit(): void {
    this.createForm();

    if(this.authService.isAuthenticated()){
        this.router.navigate(['admin/courses']);
    }
  }

  login(): void {
    this.authService.login(this.loginForm.value)
    .then(res => {
        this.router.navigate(['admin/courses']);
    })
    .catch(error => {
      if(!error.ok){

          this.msgs.push({
              severity:'error', 
              summary:'Login incorrecto', 
              detail:'el usuario y/o contrasena son incorrectos verifique su informacion'
          });
      }
    });
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: [""],
      password:[""],
    });
  }
}
