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
   
    this.http.delete<any>(deleteTodo).subscribe(
        () => {
          const index = this.todos.findIndex((i) => i.id === id);
          this.todos.splice(index, 1);
        },
        (error) => {
          console.error(error);
        }
      );
    //.subscribe(() => {
       // this.todos = this.todos.filter((t) => t.id !== id);
     // });
    
        console.log('Todo deleted');
        window.location.reload();
  

  }


  todos : Todo[] = [];
   filterBy = 'all';
  
  addNewTodo(title: string) {
    let saveTodo='http://localhost:8086/api/todos/add-Todo?title='+title;
    this.http.post<any>(saveTodo,title).subscribe((todo:any)=>{
        return this.todos.push(todo.title);
    })
    console.log('Todo added');
    window.location.reload();
        
  }
 
  
   get filteredTodos() {
    if (this.filterBy === 'completed') {
      return this.todos.filter((t) => t.completed);
    } else if (this.filterBy === 'uncompleted') {
      return this.todos.filter((t) => !t.completed);
    } else {
      return this.todos;
    }
  }

}