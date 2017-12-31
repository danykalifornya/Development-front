import { Component, OnInit } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-Examples',
    templateUrl: './examples.component.html',
    providers: [ConfirmationService]
})

export class ExamplesComponent implements OnInit {

    examples: any[] = [];
    tooltips: any[] = [];
    lesson: any = {name:''};
    display: boolean = false;
    formTitle: string = '';
    id: number;
    private sub: any;

    public exampleForm = this.fb.group({});

    constructor(
        private apiService: ApiService,
        private generalService: GeneralService,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
        public fb: FormBuilder
    ){}

    ngOnInit(): void {
        this.createForm();
        this.sub = this.route.params.subscribe(params => {
            this.getLesson(params['id']);
        });
        console.log(this.sub);
    }

    getLesson(id){
        this.apiService.getDataById(id, 'lessons', "filter[include]=examples").then(lesson => {
            this.lesson = lesson;
            this.examples = lesson.examples;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    add(): void {
        this.formTitle = 'Agregar ejemplo';
        this.display = true;
        this.createForm();
    }

    edit(example): void {
        this.formTitle = 'Editar ejemplo';
        this.display = true;
        console.log(example);
        this.exampleForm = this.fb.group(example);
        this.tooltips = JSON.parse(example.tooltips);
    }

    save(): void 
    {
        this.exampleForm.value.lesson_id = this.lesson.id;
        this.exampleForm.value.tooltips = JSON.stringify(this.tooltips);

        if(this.exampleForm.value.id){
            this.apiService.update(this.exampleForm.value, 'examples')
            .then(example => {
                this.getLesson(this.lesson.id);
                this.generalService.showNotify('success', 'Exito', 'Registro actualizado exitosamente');
            });
        }else{
            delete this.exampleForm.value.id;
            this.apiService.create(this.exampleForm.value, 'examples')
            .then(example => {
                this.getLesson(this.lesson.id);
                this.generalService.showNotify('success', 'Exito', 'Registro guardado exitosamente');
            });
        }
        this.display = false;
    }

    addTooltip(keyword, name, text){
        this.tooltips.push({keyword:keyword.value, name:name.value, text:text.value });
    }

    delete(example: any): void {
        this.confirmationService.confirm({ 
            message: 'Confirmas que deseas borrar el registro?',
            accept: () => {
                this.apiService.delete(example.id, 'examples')
                .then(() => {
                    this.examples = this.examples.filter(h => h !== example);
                })
            }
        });
    }

    deleteTooltip(index){
        this.tooltips.splice(index, 1);
    }

    createForm(): void {
        this.exampleForm = this.fb.group({
            id: [""],
            name: [""],
            description: [""],
            text: [""],
            lesson_id:[""],
        });
    }

}
