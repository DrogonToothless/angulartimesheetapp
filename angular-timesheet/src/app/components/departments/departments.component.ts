import { Component } from '@angular/core';
import { DepartmentsService } from '../../services/departments.service';
import { Department } from '../../interfaces/department';
@Component({
  selector: 'app-departments',
  standalone: false,
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent {
  departments: Department[] | undefined;
  constructor(
    private departmentsService: DepartmentsService,
  ) { }
  ngOnInit(): void {
    this.departments = this.departmentsService.departments;
  }
}
