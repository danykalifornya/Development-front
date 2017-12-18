import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService }         from './services/auth.service';

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

const routes: Routes = [
  { path: 'login',      component: LoginComponent },
  { path: 'admin',      component: AdminComponent, children: [

      { path: 'profile',     component: ProfileComponent, canActivate: [AuthService]},
      { path: 'members',     component: MembersComponent, canActivate: [AuthService]},
      { path: 'courses',     component: CoursesComponent, canActivate: [AuthService]},
      { path: 'units',     component: UnitsComponent, canActivate: [AuthService]},
      { path: 'lessons',     component: LessonsComponent, canActivate: [AuthService]},
      { path: 'examples/:id',     component: ExamplesComponent, canActivate: [AuthService]},
  	]
  },
  { path: '',      component: PublicComponent, children: [

      { path: 'lesson',     component: PublicLessonComponent},
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
