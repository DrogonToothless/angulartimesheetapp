import { Component } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../interfaces/department';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-departments',
  standalone: false,
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  departments: Department[] | undefined;
  $departments: Observable<Department[]> | undefined;
  constructor(
    private departmentsService: DepartmentsService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    // this.departmentsService.getDepartments().subscribe(departments => {
    //   this.departments = departments;
    // });
  this.$departments = this.departmentsService.getDepartments();
  }
  goToDepartment(departmentId: string): void {
    this.router.navigate(['./timesheet', {id: departmentId}]);
  }
}
