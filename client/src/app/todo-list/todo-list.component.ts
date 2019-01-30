import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo-item';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {


  constructor(public todoService: TodoService) { }

  ngOnInit() {

    this.todoService.getTodos().subscribe( response => {
      this.todoService.collection = response;

    });
  }

}
