import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  employees: any[] = [];
  size : number = 10;
  recentPage : number = 1;
  lastPage : number = 1;
  keyword : string = "";
  sizeOption : number[] = [5, 10, 20];
  pagination : number[] = [];
  sortedColumns : Map<string, any> = new Map([
    ["name", null],
    ["email", null],
    ["group", null],
    ["birthDate", null]
  ]);

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.getData(this.size, this.recentPage, this.keyword);
  }

  getData(size: number, page: number, keyword: string, sortBy? : string) {
    this.service.getAll().subscribe({
      next: (response) =>{
        let data = response as any[];
        this.lastPage = Math.ceil(data.length / size)
        this.recentPage = page;
        this.pagination = this.setPagination(this.lastPage, page);
        this.employees = this.processData(data, size, page, keyword, sortBy);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
  processData(data: any[], size: number, page: number, keyword: string, sortBy? : string) {
    return this.sortData(
      this.filterData(
        this.sliceData(data, size, page),
        keyword
      ),
      sortBy
    );
  }

  sliceData(data: any[], size: number, page: number) {
    let index = (page - 1) * size;
    return data.slice(index, index + size);
  }

  filterData(data: any[], keyword: string) {
    return data.filter(
      (employee) => (
        employee.firstName.toLowerCase() + ' ' + employee.lastName.toLowerCase()
      ).includes(
        keyword.toLowerCase()
      )
    );
  }

  sortData(data: any[], sortBy: string | undefined){
    switch (sortBy) {
      case "name":
        data.sort((a,b) => {
          let fa = a.firstName.toLowerCase()
          let fb = b.firstName.toLowerCase();
  
          if (fa < fb) {
            return this.sortedColumns.get("name") ? -1 : 1;
          }
          if (fa > fb) {
            return this.sortedColumns.get("name") ? 1 : -1;
          }
          return 0;
        });
        break;
      case "email":
        data.sort((a,b) => {
          let fa = a.email.toLowerCase()
          let fb = b.email.toLowerCase();
  
          if (fa < fb) {
            return this.sortedColumns.get("email") ? -1 : 1;
          }
          if (fa > fb) {
            return this.sortedColumns.get("email") ? 1 : -1;
          }
          return 0;
        });
        break;
      case "group":
        data.sort((a,b) => {
          let fa = a.group.toLowerCase()
          let fb = b.group.toLowerCase();
  
          if (fa < fb) {
            return this.sortedColumns.get("group") ? -1 : 1;
          }
          if (fa > fb) {
            return this.sortedColumns.get("group") ? 1 : -1;
          }
          return 0;
        });
        break;
      case "birthDate":
        data.sort((a,b) => {
          let fa = new Date(a.birthDate);
          let fb = new Date(b.birthDate);
  
          if (fa < fb) {
            return this.sortedColumns.get("birthDate") ? -1 : 1;
          }
          if (fa > fb) {
            return this.sortedColumns.get("birthDate") ? 1 : -1;
          }
          return 0;
        });
        break;
      default:
        break;
      }
    return data;
  }

  sortBy(column: string) {
    let value = this.sortedColumns.get(column) ? true : false;
    this.sortedColumns.set(column, !value);

    for(let [key, value] of this.sortedColumns) {
      if(key == column) {
        continue;
      }
      this.sortedColumns.set(key, null);
    }

    this.getData(this.size, this.recentPage, this.keyword, column);
  }

  setPagination(lastPage: number, recentPage: number){
    let pagination : any[] = lastPage > 5 ? Array(5) : Array(lastPage);

    if (recentPage < 5) {
      for(let i = 0; i < pagination.length; i++) {
        pagination[i] = i + 1;
      }  
    } else if (recentPage > lastPage - 4) {
      for(let i = 0; i < pagination.length; i++) {
        pagination[i] = i + 1 + lastPage - 5;
      }  
    } else {
      for(let i = -2; i <= 2; i++) {
        if(i + 2 > lastPage) {
          break;
        }
        pagination[i + 2] = recentPage + i;
      }
    }
    return pagination;
  }
}
