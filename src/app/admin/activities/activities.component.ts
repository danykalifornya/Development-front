import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'my-Activities',
  templateUrl: './actvities.component.html',
  providers: [ConfirmationService]
})

export class ActivitiesComponent implements OnInit {

  activities: any[] = [];
  units: any[];
  display: boolean = false;
  formTitle: string = '';

  public activityForm = this.fb.group({});

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
    public fb: FormBuilder,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.apiService.getDataDropdown('units?filter[include]=course', 'course').then(units => this.units = units);
    this.getUnits();
    this.createForm();
  }

  getUnits(): void {
    this.apiService.getData('activities?filter[include]=unit').then(activities => this.activities = activities);
  }

  add(): void {
    this.formTitle = 'Agregar actividad';
    this.display = true;
    this.createForm();
  }

  edit(activity): void {
    this.formTitle = 'Editar actividad';
    this.display = true;
    this.activityForm = this.fb.group(activity);
  }

  save(): void {
    if(this.activityForm.value.id){
      this.apiService.update(this.activityForm.value, 'activities')
      .then(activity => {
        this.getUnits();
        this.generalService.showNotify('success', 'Exito', 'Registro actualizado exitosamente');
      });
    }else{
      delete this.activityForm.value.id;
      console.log(this.activityForm.value);
      this.apiService.create(this.activityForm.value, 'activities')
      .then(activity => {
        this.getUnits();
        this.generalService.showNotify('success', 'Exito', 'Registro guardado exitosamente');
      });
    }
    this.display = false;
  }

  delete(activity: any): void {
    this.confirmationService.confirm({
      message: 'Confirmas que deseas borrar el registro?',
      accept: () => {
        this.apiService
          .delete(activity.id, 'activities')
          .then(() => {
            this.activities = this.activities.filter(h => h !== activity);
          })
      }
    });
  }

  createForm(): void {
    this.activityForm = this.fb.group({
      id: [""],
      name: [""],
      description: [""],
      lesson_id:[""],
    });
  }

}
