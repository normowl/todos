import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo-item';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  public isEdit = false;

  @Input() item: TodoItem;

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  constructor(public todoService: TodoService, private snackBar: MatSnackBar) { }

  saveChanges(todo) {
    this.toggleEdit();

    if (!todo.id) {
      return this.todoService.createTodo(todo).subscribe( response => {
        this.todoService.collection.unshift(response);
        console.log(response);
        this.snackBar.open('Todo added', 'Done', {duration: 1000});
      });
    }
    return this.todoService.updateTodo(todo.id, todo).subscribe( response => {
      this.snackBar.open('Todo updated', 'Done', {duration: 1000});
      console.log(response);
    });
  }

  deleteItem(todo) {
    todo.isDeleted = true;
    return this.todoService.deleteTodo(todo.id).subscribe( response => {
      console.log(response);
      this.snackBar.open('Todo deleted', 'Done', {duration: 1000});
    });
  }

  ngOnInit() {

    if (!this.item) {
      this.item = new TodoItem();
      this.isEdit = true;
    }
  }

}
