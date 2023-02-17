import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo } from '../todo/todo';

@Injectable({providedIn:'root'})
export class TodoService{
    constructor(private http: HttpClient) { }

    configUrl = 'http://localhost:8086/api/todos/all';
    
getTodoList() {
  return this.http.get<Todo[]>(this.configUrl);
}

markTodoCompleted(id:number){
  let markCompleteUrl='http://localhost:8086/api/todos/'+id+'/complete';
  console.log(markCompleteUrl)
       this.http.put<any>(markCompleteUrl,{}).subscribe();
}
markTodoUnCompleted(id:number){
    let markUnCompleteUrl='http://localhost:8086/api/todos/'+id+'/uncomplete';
    console.log(markUnCompleteUrl)
         this.http.put<any>(markUnCompleteUrl,{}).subscribe();
  }
  public setTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: todos }))
  }
  deleteTodo(id:number){
    let deleteTodo='http://localhost:8086/api/todos/'+id;
   // this.todos = this.todos.filter((t) => t.id == id );
   
   return  this.http.delete<any>(deleteTodo);
        
  }


   
  
  addNewTodo(title: string) {
    let saveTodo='http://localhost:8086/api/todos/add-Todo?title='+title;
   return  this.http.post<any>(saveTodo,title);
        
  }
 
  
    filteredTodos(filterBy:string) {
      let filreUrl='http://localhost:8086/api/todos/filtred?filterBy='+filterBy;
       return this.http.get<Todo[]>(filreUrl);
    }

}