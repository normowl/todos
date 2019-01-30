import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiURL = 'http://localhost:8080/api';

  public collection: TodoItem[];

  constructor(private httpClient: HttpClient) { }

  public createTodo(todo: TodoItem) {
    return this.httpClient.post<TodoItem>(`${this.apiURL}/todo`, todo);
  }

  public updateTodo(id: number, todo: TodoItem) {
    return this.httpClient.put<TodoItem>(`${this.apiURL}/todo/${id}`, todo);
  }

  public deleteTodo(id: number) {
    return this.httpClient.delete<TodoItem>(`${this.apiURL}/todo/${id}`);
  }

  public getTodoById(id: number) {

    return this.httpClient.get<TodoItem>(`${this.apiURL}/todo/${id}`);

  }

  public getTodos() {
    return this.httpClient.get<TodoItem[]>(`${this.apiURL}/todos`);
  }

}
