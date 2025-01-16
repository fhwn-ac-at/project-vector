import { EmployeeEntity } from "./employee.entity";

// Service entity
export class ServiceEntity {
    id?: string;
    name?: string;
    price?: number;
    employees: EmployeeEntity[] = [];
}