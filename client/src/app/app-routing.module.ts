import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent} from './todo-list/todo-list.component';
const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
    data: { title: 'My Todos' }
  },
  { path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
