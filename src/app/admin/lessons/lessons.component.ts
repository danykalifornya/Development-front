import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'my-Lessons',
  templateUrl: './lessons.component.html',
  providers: [ConfirmationService]
})

export class LessonsComponent implements OnInit {

    lessons: any[] = [];  
    relations: any[] = [];
    units: any[];
    display: boolean = false;
    formTitle: string = '';
    relationsArray: any[] = [];

    public lessonForm = this.fb.group({});

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
        this.apiService.getData("lessons?filter[include]=examples&filter[include]=unit").then(lessons => this.lessons = lessons);
    }

    getRelations(): void {
        var unit = this.lessonForm.value.unit_id;
        
        this.apiService.getDataDropdown('lessons').then(
            relations => {
                this.relations = relations;
            }
        );
    }

    add(): void {
        this.formTitle = 'Agregar leccion';
        this.display = true;
        this.createForm();
    }

    edit(lesson): void {
        this.formTitle = 'Editar leccion';
        this.display = true;
        this.apiService.getDataById(lesson.id, 'lessons').then(lesson => {
            this.lessonForm = this.fb.group(lesson);
        });
        this.getRelations();
        this.relationsArray = JSON.parse(lesson.relations);
    };

    save(): void {

        this.lessonForm.value.relations = JSON.stringify(this.relationsArray);
        if(this.lessonForm.value.id){
            this.apiService.update(this.lessonForm.value, 'lessons')
            .then(lesson => {
                this.getUnits();
                this.generalService.showNotify('success', 'Exito', 'Registro actualizado exitosamente');
            });
        }else{
            delete this.lessonForm.value.id;
            this.apiService.create(this.lessonForm.value, 'lessons')
            .then(lesson => {
                this.getUnits();
                this.generalService.showNotify('success', 'Exito', 'Registro guardado exitosamente');
            });
        }
        this.display = false;
    }

    delete(lesson: any): void {
        this.confirmationService.confirm({
            message: 'Confirmas que deseas borrar el registro?',
            accept: () => {
                this.apiService.delete(lesson.id, 'lessons').then(() => {
                    this.lessons = this.lessons.filter(h => h !== lesson);
                })
            }
        });
    }

    addRelations(text, id){
        this.relationsArray.push({text:text.value, id:id.value });
    }

    deleteRelation(index){
        this.relationsArray.splice(index, 1);
    }

    createForm(): void {
        this.lessonForm = this.fb.group({
            id: [""],
            name: [""],
            description: [""],
            unit_id:[""],
            tags:[""],
            relations:[""]
        });
    }
}