import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'my-members',
  templateUrl: './members.component.html',
  providers: [ConfirmationService]
})

export class MembersComponent implements OnInit {

  members: any[] = [];
  display: boolean = false;
  formTitle: string = '';

  public userForm = this.fb.group({});

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
    public fb: FormBuilder,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.getMembers();
    this.createForm();
  }

  getMembers(): void {
    this.apiService.getData('members').then(members => this.members = members);
  }

  add(): void {
    this.formTitle = 'Agregar unidad';
    this.display = true;
    this.createForm();
  }

  edit(unit): void {
    this.formTitle = 'Editar unidad';
    this.display = true;
    this.userForm = this.fb.group(unit);
  }

  save(): void {
    if(this.userForm.value.id){
      this.apiService.update(this.userForm.value, 'members')
      .then(unit => {
        this.getMembers();
        this.generalService.showNotify('success', 'Exito', 'Registro actualizado exitosamente');
      });
    }else{
      delete this.userForm.value.id;
      this.apiService.create(this.userForm.value, 'members')
      .then(unit => {
        this.getMembers();
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
          .delete(unit.id, 'members')
          .then(() => {
            this.members = this.members.filter(h => h !== unit);
          })
      }
    });
  }

  createForm(): void {
    this.userForm = this.fb.group({
      id: [""],
      email: [""],
      password:[""],
    });
  }

  /*getName(id): string {
    this.data1 = this.courses.filter(x => x.value === id);
    return this.data1[0].label;
  }*/

}
