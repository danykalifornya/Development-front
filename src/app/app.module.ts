import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { GeneralService }          from './services/general.service';
import { ApiService }          from './services/api.service';
import { AuthService }          from './services/auth.service';

import { AppComponent }         from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent }      from './login/login.component';
import { AdminComponent }   from './admin/admin.component';
import { ProfileComponent }      from './admin/profile/profile.component';
import { MembersComponent }      from './admin/members/members.component';
import { CoursesComponent }      from './admin/courses/courses.component';
import { UnitsComponent }      from './admin/units/units.component';
import { LessonsComponent }      from './admin/lessons/lessons.component';
import { ExamplesComponent }      from './admin/examples/examples.component';

import { PublicComponent }      from './public/public.component';
import { PublicLessonComponent }      from './public/lesson/lesson.component';


import { FilterPipe } from './filter.pipe';
import { 
  DataTableModule, ConfirmDialogModule, ConfirmationService, SidebarModule, GrowlModule,
  DropdownModule, EditorModule
} from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    SidebarModule,
    GrowlModule,
    DataTableModule,
    DropdownModule,
    EditorModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ProfileComponent,
    MembersComponent,
    CoursesComponent,
    UnitsComponent,
    LessonsComponent,
    ExamplesComponent,

    PublicComponent,
    PublicLessonComponent,
    FilterPipe
  ],
  providers: [ GeneralService, ApiService, AuthService, ConfirmationService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
