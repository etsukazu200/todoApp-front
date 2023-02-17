import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from './todo'
import { TodoService } from '../service/todo.service';
import {  EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
selector:'create-todo',
templateUrl:'./create-todo.Component.html',
styleUrls:['./create-todo.Component.css']

})

export class createTodoComponent implements OnInit{
  @Input() title = '';
  @Input() completed=false
  
    
   //public test : string = "toto";

  displayedColumns:string[] =  ['title', 'status','actions']
    todos: Todo[] = [];
    filterBy = 'all';
    newTodo: Todo = new Todo();


    constructor(private todoService:TodoService ) { }

    ngOnInit() {
         this.todoService.getTodoList().subscribe((todo:Todo[])=>{
            this.todos=todo;
         });
      }

      getToList() {
        this.todoService.getTodoList().subscribe((todo:Todo[])=>{
           this.todos=todo;
        });
     }

      markTodoCompleted(todo:Todo){
        console.log(todo)
        if(todo.completed==true)
        {this.todoService.markTodoUnCompleted(todo.id);
          
        }
       else{this.todoService.markTodoCompleted(todo.id);}
       todo.completed=!todo.completed;
        
      }

      deleteTodo(todoDelete:Todo){
        this.todoService.deleteTodo(todoDelete.id).subscribe(()=>{
           
        this.todos=this.todos.filter((todo) => todo.id !== todoDelete.id);
        });
      }
     // @Output() addTodo: EventEmitter<Todo> = new EventEmitter();
      //submitTodo() {

      //  this.addTodo.emit(this.newTodo);
      //  this.newTodo = new Todo();
      //}
     
      addNewTodo(title: string) {
       this.todoService.addNewTodo(title).subscribe((todo:Todo)=>{
         this.todos = [...this.todos,todo];
          console.log(todo)
          
       });
      }
   
        filteredTodos() {
        return this.todoService.filteredTodos(this.filterBy).subscribe((todofiltre:Todo[])=>{
          this.todos=todofiltre;
        });
      }
      

}