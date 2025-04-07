import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../../interfaces/department';
import { DepartmentsService } from '../../services/departments.service';
import { FormControl } from '@angular/forms';
import { Employee } from '../../interfaces/employee';
@Component({
  selector: 'app-timesheet',
  standalone: false,
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss'
})
export class TimesheetComponent {
  departments: Department[] | undefined;
  department: Department | undefined;
  employeeNameFC = new FormControl('');
  employees: Employee[] = [];
  employeeId = 0;
  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
  ) { }
  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
    this.department = this.departments.find(department => department.id === this.route.snapshot.params['id']);
  }
  addEmployee(): void {
    if (this.employeeNameFC.value) {
      this.employeeId++;
      this.employees.push({
        id: this.employeeId.toString(),
        departmentId: this.department?.id,
        name: this.employeeNameFC.value,
        payRate: Math.floor(Math.random() * 50) + 50,
      });
      this.employeeNameFC.setValue('');
    }
  }
}