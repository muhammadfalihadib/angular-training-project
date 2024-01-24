export class Employee {
    id: string;
    username: string;
    firstName:string;
    lastName:string;
    email:string;
    birthDate:Date;
    basicSalary:number;
    status:string;
    group:string;
    description:Date;

    constructor(model?: any) {
        model = model || {};
        this.id = model.id || null;
        this.username = model.username || null;
        this.firstName = model.firstName || null;
        this.lastName = model.lastName || null;
        this.email = model.email || null;
        this.birthDate = model.birthDate || null;
        this.birthDate = model.birthDate || null;
        this.basicSalary = model.basicSalary || null;
        this.status = model.status || null;
        this.group = model.group || null;
        this.description = model.description || null;
    }
}