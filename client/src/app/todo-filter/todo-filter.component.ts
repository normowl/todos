import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from '../todo.service';
import { format, differenceInDays, addDays } from 'date-fns';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit {

  statusSelected = new FormControl();
  statusList = [{label: 'Completed', value: {completed: true}}, {label: 'Not Completed', value: {completed: false}}];

  dateSelected = new FormControl();
  dateList = [
    {label: 'Overdue', value: 'overdue'},
    {label: 'Today', value: 'today'},
    {label: 'Tomorrow', value: 'tomorrow'}];

  constructor(public todoService: TodoService) { }

  filter() {

    const filters = this.statusSelected.value;

    for (const item of this.todoService.collection) {
      if (item.completed !== this.statusSelected.value.completed) {

        item.isFiltered = true;
      } else {
        item.isFiltered = false;
      }
    }


  }

  ngOnInit() {

  }

}
