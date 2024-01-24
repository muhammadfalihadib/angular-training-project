import { Component } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  groupOption = ['UI/UX', 'Frontend', 'Backend'];
  statusOption = [
    {
      id:0,
      name:"Inactive"
    },
    {
      id:1,
      name:"Active"
    },
  ];

  constructor(private service: EmployeeService, private route: Router){}
  
  onSubmit(value: any){
    this.service.create(JSON.stringify(value)).subscribe({
      next: (response) =>{
        this.route.navigateByUrl(`/employee`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getToday(){
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + today.getMonth() + 1).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
