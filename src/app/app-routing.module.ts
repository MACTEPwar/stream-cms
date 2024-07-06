import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PersonalAreaComponent } from './views/personal-area/personal-area.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegisterComponent,
  },
  {
    path: 'personal-area',
    component: PersonalAreaComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
