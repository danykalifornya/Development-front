import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'my-courses',
  templateUrl: './courses.component.html',
  providers: [ConfirmationService]
})

export class CoursesComponent implements OnInit {
  
  courses: any[] = [];
  display: boolean = false;
  formTitle: string = '';
  
  public courseForm = this.fb.group({});

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
    public fb: FormBuilder,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.getCourses();
    this.createForm();
  }

  getCourses(): void {
    this.apiService.getData('courses').then(courses => this.courses = courses);
  }

  add(): void {
    this.formTitle = 'Agregar curso';
    this.display = true;
    this.createForm();
  }

  edit(course): void {
    this.formTitle = 'Editar curso';
    this.display = true;
    this.courseForm = this.fb.group(course);
  }

  save(): void {
    if(this.courseForm.value.id){
      this.apiService.update(this.courseForm.value, 'courses')
      .then(course => {
        this.getCourses();
        this.generalService.showNotify('success', 'Exito', 'Registro actualizado exitosamente');
      });
    }else{
      delete this.courseForm.value.id;
      this.apiService.create(this.courseForm.value, 'courses')
      .then(course => {
        this.getCourses();
        this.generalService.showNotify('success', 'Exito', 'Registro guardado exitosamente');
      });
    }
    this.display = false;
  }

  delete(course: any): void {
    this.confirmationService.confirm({
      message: 'Confirmas que deseas borrar el registro?',
      accept: () => {
        this.apiService
          .delete(course.id, 'courses')
          .then(() => {
            this.courses = this.courses.filter(h => h !== course);
          })
      }
    });
  }

  createForm(): void {
    this.courseForm = this.fb.group({
      id: [""],
      name: [""]
    });
  }

}
