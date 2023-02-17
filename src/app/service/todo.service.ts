import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Todo } from '../todo/todo';
import { Token } from '@angular/compiler';

@Injectable({providedIn:'root'})
export class TodoService{
    constructor(private http: HttpClient) {
    
     }

    configUrl = 'http://localhost:8086/api/todos/all';
    
getTodoList() {
  return this.http.get<Todo[]>(this.configUrl,this.getOption());
}

markTodoCompleted(id:number){
  let markCompleteUrl='http://localhost:8086/api/todos/'+id+'/complete';
  console.log(markCompleteUrl)
       this.http.put<any>(markCompleteUrl,{},this.getOption()).subscribe();
}
markTodoUnCompleted(id:number){
    let markUnCompleteUrl='http://localhost:8086/api/todos/'+id+'/uncomplete';
    console.log(markUnCompleteUrl)
         this.http.put<any>(markUnCompleteUrl,{},this.getOption()).subscribe();
  }
  
  deleteTodo(id:number){
    let deleteTodo='http://localhost:8086/api/todos/'+id;
   // this.todos = this.todos.filter((t) => t.id == id );
   
   return  this.http.delete<any>(deleteTodo,this.getOption());
        
  }


   
  
  addNewTodo(title: string) {
    let saveTodo='http://localhost:8086/api/todos/add-Todo?title='+title;
   return  this.http.post<any>(saveTodo,title,this.getOption());
        
  }
 
  
    filteredTodos(filterBy:string) {
      let filreUrl='http://localhost:8086/api/todos/filtred?filterBy='+filterBy;
       return this.http.get<Todo[]>(filreUrl,this.getOption());
       
    }

    login(name:string,pass:string){
    let loginUrl='http://localhost:8086/api/auth/login'

    
     return this.http.post<any>(loginUrl,{username:name,password:pass})

    }
     getOption(){

       return {headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem("token"),
  
       })}
     }
     inscription(name:string,pass:string){
      let loginUrl='http://localhost:8086/api/auth/inscription'
  
      
       return this.http.post<any>(loginUrl,{username:name,password:pass})
  
      }
}