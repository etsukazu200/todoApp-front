import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private todoService:TodoService ,private router: Router) { }
  
  submit() {
    if (this.form.valid) {
      this.todoService.login(this.form.controls["username"].value,this.form.controls["password"].value)
      .subscribe((tokenObj:any)=>{
          console.log(tokenObj);
          localStorage.setItem("token",tokenObj.token);
          this.router.navigate(['/todo']);
      });
    }
  }
  inscription() {
    if (this.form.valid) {
      this.todoService.inscription(this.form.controls["username"].value,this.form.controls["password"].value).subscribe();
      
    }
  }
  @Input() error: string ="";

  @Output() submitEM = new EventEmitter();
  
}

