import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'my-profile',
  templateUrl: './profile.component.html',
  providers: [ConfirmationService]
})

export class ProfileComponent implements OnInit {

  public profileForm = this.fb.group({});
  public passwordForm = this.fb.group({});

  constructor(
    private apiService: ApiService,
    private generalService: GeneralService,
    public fb: FormBuilder,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {

    this.createForm();
    var id = localStorage.getItem('memberId');
    this.apiService.getDataById(id, 'members')
    .then(profile => {
      this.profileForm = this.fb.group(profile);
    });
  }


  save(): void {
      this.apiService.update(this.profileForm.value, 'members')
      .then(profile => {
        this.generalService.showNotify('success', 'Exito', 'Perfil actualizado exitosamente');
      });
  }

  changePass(): void {
      this.apiService.changePassword(this.passwordForm.value)
      .then(profile => {
        this.generalService.showNotify('success', 'Exito', 'Contrasena actualizada exitosamente');
      }).catch(error =>{
        this.generalService.showNotify('error', 'Error', 'La contrasena actual no coincide');
      });
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      id: [""],
      first_name: [""],
      last_name: [""],
      email:[{value:"", disabled:true}],
    });

    this.passwordForm = this.fb.group({
      oldPassword: [""],
      newPassword: [""]
    });
  }
}
