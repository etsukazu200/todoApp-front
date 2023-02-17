import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { createTodoComponent } from './todo/create-todo.component';

const routes: Routes = [{path:'todo',component:createTodoComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
