import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'my-units',
  templateUrl: './units.component.html',
  providers: [ConfirmationService]
})

export class UnitsComponent implements OnInit {

  units: any[] = [];
  courses: any[];
  display: boolean = false;
  formTitle: string = '';

  public unitForm = this.fb.group({});

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
    public fb: FormBuilder,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.apiService.getDataDropdown('courses').then(courses => this.courses = courses);
    this.getUnits();
    this.createForm();
  }

  getUnits(): void {
    this.apiService.getData('units?filter[include]=course').then(units => this.units = units);
  }

  add(): void {
    this.formTitle = 'Agregar unidad';
    this.display = true;
    this.createForm();
  }

  edit(unit): void {
    this.formTitle = 'Editar unidad';
    this.display = true;
    this.unitForm = this.fb.group(unit);
  }

  save(): void {
    if(this.unitForm.value.id){
      this.apiService.update(this.unitForm.value, 'units')
      .then(unit => {
        this.getUnits();
        this.generalService.showNotify('success', 'Exito', 'Registro actualizado exitosamente');
      });
    }else{
      delete this.unitForm.value.id;
      console.log(this.unitForm.value);
      this.apiService.create(this.unitForm.value, 'units')
      .then(unit => {
        this.getUnits();
        this.generalService.showNotify('success', 'Exito', 'Registro guardado exitosamente');
      });
    }
    this.display = false;
  }

  delete(unit: any): void {
    this.confirmationService.confirm({
      message: 'Confirmas que deseas borrar el registro?',
      accept: () => {
        this.apiService
          .delete(unit.id, 'units')
          .then(() => {
            this.units = this.units.filter(h => h !== unit);
          })
      }
    });
  }

  createForm(): void {
    this.unitForm = this.fb.group({
      id: [""],
      name: [""],
      course_id:[""],
    });
  }

  /*getName(id): string {
    this.data1 = this.courses.filter(x => x.value === id);
    return this.data1[0].label;
  }*/

}
