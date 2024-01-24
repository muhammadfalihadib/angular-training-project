import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {
  url: string = "http://localhost:3002/employee";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url);
  }

  getOne(id: string | number) {
    return this.http.get(`${this.url}/${id}`);
  }

  create(body: any) {
    return this.http.post(this.url, body);
  }

  patch(id: string | number, body: any, header: any) {
    header = header || {};
    return this.http.patch(`${this.url}/${id}`, body, header);
  }

  delete(id: string | number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
