import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Employee } from '../interfaces/employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeHoursCollection: AngularFirestoreCollection<Employee>;
  constructor(private db: AngularFirestore) {
    this.employeeHoursCollection = this.db.collection('employee-hours');
  }
  saveEmployeeHours(employee: Employee): Promise<any> {
    employee.departmentId = employee.departmentId || '0';
    console.log('Saving employee hours:', employee);
    return this.employeeHoursCollection.add(employee);
  }
}