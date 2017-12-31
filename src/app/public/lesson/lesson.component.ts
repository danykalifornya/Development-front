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
    lessons: any[];
    showLessons: boolean = false;

  	constructor(
	    private apiService: ApiService,
	    private generalService: GeneralService
  	){}

  	ngOnInit(): void 
    {
        var localLesson = localStorage.getItem('lesson');
        if(localLesson != null){
            this.selectLesson(JSON.parse(localLesson));
        }
  	}

    selectLesson(lesson): void 
    {
        this.apiService.getDataById(lesson.id, 'lessons', "filter[include]=examples").then(lesson => {
            this.lesson = lesson;
            for (var i = 0; i < lesson.examples.length; i++) 
            {
              if(i) lesson.examples[i].open = false;
              else lesson.examples[i].open = true;

              lesson.examples[i].text = this.createTooltip(lesson.examples[i]);

            }
            localStorage.setItem('lesson', JSON.stringify(lesson));
        });
        this.showLessons = false;
    }

    createTooltip(example){
        var tooltips = JSON.parse(example.tooltips);
        var text = "";
        tooltips.forEach(function(tool){

            text = example.text.replace("[*"+ tool.keyword +"*]",'<div class="plus">+ <div class="plus-content">'+ tool.text +'</div></div>');
        });
        return text.replace(/\n/g, '<br />');
    }

    openTab(index){
        if(this.lesson.examples[index].open) this.lesson.examples[index].open = false;
        else this.lesson.examples[index].open = true;
    }

    toggleMenu(x){
        if(this[x]) this[x] = false;
        else this[x] = true;
    }

    search(x): void {
        var course = localStorage.getItem('course');
        this.apiService.getData('lessons?filter[include]=unit').then(lessons => {
            this.lessons = lessons;
            console.log(lessons);
        });
        //'lessons?filter[include][unit][name]=Funciones&filter[where][tags][like]='+x.value

        //this.showLessons = false;
    }
}
