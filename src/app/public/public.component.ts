import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { GeneralService }         from '../services/general.service';
import { ApiService }         from '../services/api.service';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'primeng/components/common/api';
import { PublicLessonComponent } from "./lesson/lesson.component";

@Component({
    selector: 'public',
    templateUrl: './public.component.html',
    styleUrls: [ './public.component.css' ],
    encapsulation: ViewEncapsulation.None // to apply css style to body
})

export class PublicComponent implements OnInit {

    title: string = "Seleciona un curso";
    courses: any[] = [];
    units: any[] = [];
    course: any = {};
    unit: any = {};

    showCourses: boolean = false;
    showUnits: boolean = false;

    @ViewChild(PublicLessonComponent) publicLessons;

    constructor(
        private apiService: ApiService,
        private generalService: GeneralService
    ){}

    ngOnInit(): void {
        this.getCourses();
        var localCourse = localStorage.getItem('course');
        var localUnit = localStorage.getItem('unit');

        if(localCourse != null){
            this.selectCourse(JSON.parse(localCourse));
            if(localUnit != null){
                this.selectUnit(JSON.parse(localUnit));
            }
        }
    }
  
    getCourses(): void {
        this.apiService.getData('courses?filter[include]=units').then(courses => {
            this.courses = courses;
        });
    }

    selectCourse(course): void {
        this.course = course;
        this.units = course.units;
        this.title = course.name;
        this.showUnits = true;
        this.unit = {};
        this.publicLessons.lesson = {};
        localStorage.setItem('course', JSON.stringify(course));
    }

    selectUnit(unit): void {
        this.apiService.getDataById(unit.id, 'units', "filter[include]=lessons").then(unit => {
            this.unit = unit;
            this.showUnits = false;
            this.publicLessons.lessons = unit.lessons;
            this.publicLessons.showLessons = true;
            localStorage.setItem('unit', JSON.stringify(unit));
        });
    }

    toggleMenu(x){
        if(this[x]) this[x] = false;
        else this[x] = true;
    }

}
