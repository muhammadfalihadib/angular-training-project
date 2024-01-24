import { Component } from '@angular/core';
import { Employee } from './employee.model';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
  employee = new Employee();

  constructor(private activeRoute: ActivatedRoute, private service: EmployeeService){

  } 
  ngOnInit(): void {
    this.getUserDetail();
  }
  
  getUserDetail(){
    let id = this.activeRoute.snapshot.paramMap.get("id");
    this.service.getOne(id as string).subscribe({
      next: (response) =>{
        console.log(response);
        this.employee = new Employee(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
