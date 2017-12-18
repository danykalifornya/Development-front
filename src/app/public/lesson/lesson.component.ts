import { Component, OnInit, Input } from '@angular/core';
import { ApiService }         from '../../services/api.service';
import { GeneralService }         from '../../services/general.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'public-lesson',
  templateUrl: './lesson.component.html'
})

export class PublicLessonComponent implements OnInit {

  	lesson: any = {};
    showLessons: boolean = false;

  	constructor(
	    private apiService: ApiService,
	    private generalService: GeneralService
  	){}

  	ngOnInit(): void {
  	}

    selectLesson(lesson): void {
        this.apiService.getDataById(lesson.id, 'lessons', "filter[include]=examples").then(lesson => {
            this.lesson = lesson;
            for (var i = 0; i < lesson.examples.length; i++) 
            {
              if(i) lesson.examples[i].open = false;
              else lesson.examples[i].open = true;
            }
        });
    }

    openTab(index){
        if(this.lesson.examples[index].open) this.lesson.examples[index].open = false;
        else this.lesson.examples[index].open = true;
    }

    toggleMenu(x){
        if(this[x]) this[x] = false;
        else this[x] = true;
    }
}
