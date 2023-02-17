import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { createTodoComponent } from './todo/create-todo.component';


const routes: Routes = [
{path:'todo',component:createTodoComponent},
{path:'login',component:LoginComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
