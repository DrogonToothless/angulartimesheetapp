import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  getEmployeeHoursByDepartment(departmentId: string): Observable<Employee[]> {
    const filteredEmployees = this.db.collection('employee-hours', ref => ref.where('departmentId', '==', departmentId));
    return filteredEmployees.snapshotChanges().pipe(
        map((items: DocumentChangeAction<unknown>[]): Employee[] => {
            return items.map((item: DocumentChangeAction<unknown>): Employee => {
                const data = item.payload.doc.data() as Employee;
                return {
                    id: item.payload.doc.id,
                    departmentId,
                    name: data.name,
                    payRate: data.payRate,
                    monday: data.monday,
                    tuesday: data.tuesday,
                    wednesday: data.wednesday,
                    thursday: data.thursday,
                    friday: data.friday,
                    saturday: data.saturday,
                    sunday: data.sunday,
                };
            });
        })
    );
}
}