import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  detailForm!: FormGroup;
  accountList: any[] = [
    {
      "username": "falih",
      "password": "indocyber"
    }
  ]

  constructor(private formBuilder: FormBuilder, private router: Router){
    this.detailForm = this.createForm();
  }

  createForm(){
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(){
    const value = this.detailForm.getRawValue();

    if(this.authenticate(value)){
      localStorage.setItem('token', 'token');
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 300);
    } else {
      alert("Login gagal")
    }
  }

  authenticate(value: any){
    
    for(let account of this.accountList) {
      if (account.username == value.username && account.password == value.password) {
        return true;
      }
    }
    return false;
  }
}
