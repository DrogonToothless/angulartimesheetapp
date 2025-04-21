import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-timesheet',
  standalone: false,
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent {
  $departments: Observable<Department[]> | undefined;
  departments: Department[] | undefined;
  department: Department | undefined;
  employeeNameFC = new FormControl('', this.nameValidator());
  employees: Employee[] = [];
  employeeId = 0;
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private employeeService: EmployeeService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.$departments = this.departmentsService.getDepartments();
    this.$departments.pipe(
      switchMap(departments => {
        this.department = departments.find(dept => dept.id === this.route.snapshot.params['id'])
        return this.department ? this.employeeService.getEmployeeHoursByDepartment(this.department.id) : [];
      }),
      tap(employees => {
        this.employees = employees;
      })
    ).subscribe();
}
  addEmployee(): void {
    if (this.employeeNameFC.value) {
        this.employeeId++;
        this.employees.push({
            id: this.employeeId.toString(),
            departmentId: this.department?.id,
            name: this.employeeNameFC.value,
            payRate: Math.floor(Math.random() * 50) + 50,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0
        });
        this.employeeNameFC.setValue('');
    }
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.employees && this.employees.length) {
        this.employees.forEach(employee => {
          if (employee.name.toLowerCase() === control.value.toLowerCase()) {
            error = {duplicate: true};
          }
        });
      }
      return error;
    };
  }
  getTotalHours(employee: Employee): number {return employee.monday + employee.tuesday + employee.wednesday + employee.thursday + employee.friday + employee.saturday + employee.sunday;}
  deleteEmployee(index: number): void {
    this.employees.splice(index, 1);
  }
  submit(): void {
    this.employees.forEach(employee => {
      this.employeeService.saveEmployeeHours(employee);
    });

    this.router.navigate(['./departments']);
  }
}