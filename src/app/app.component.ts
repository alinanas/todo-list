import { TodoListService } from './services/todolist.service';
import { TodoItem } from './interfaces/TodoItem';
import { Component } from '@angular/core'; 
import { OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
  
@Component({ 
    selector: 'app-root', 
    templateUrl: './app.component.html', 
    styleUrls: ['./app.component.css'],
    providers: [TodoListService]
}) 
export class AppComponent implements OnInit {
    items: TodoItem[] = []; 
    todoFrom: FormGroup;
    listChangedSub;
    mode = 'create';
    editId = 0;
    
    constructor(private todolistService: TodoListService) {
    }

    ngOnInit() {
      this.todoFrom = new FormGroup({
        todoItem: new FormControl('', Validators.required)
      });

      this.items = this.todolistService.getTodoList();
      this.listChangedSub = this.todolistService.todoListChanged.subscribe((list: TodoItem[]) => {
        this.items = list;
      })
    } 

    ngOnDestroy() {
      this.listChangedSub.unsubscribe();
    }

    get todoItem() { return this.todoFrom.get('todoItem'); }

    onSubmit () {
      console.log('submit', this.todoFrom.get('todoItem'));
      if (this.mode === 'create') {
        this.addToList();
      } else {
        this.saveItem();
      }
      // this.todoFrom.reset();
    }

    addToList() { 
      console.log(">>>", this.todoFrom.get('todoItem').value);
      const str = this.todoFrom.get('todoItem').value;

      if (!str || str.replaceAll(' ','') === '') { } 
      else { 
        this.todolistService.addItemToList(str);
      } 
      this.todoFrom.reset();
    } 
  
    deleteItem(id: number) { 
      this.todolistService.deleteItemFromList(id); 
      this.cancelEdit ();
    } 

    updateItem(index) { 
      this.mode = 'edit';
      this.editId = index;
      this.todoFrom.get('todoItem').setValue(this.items.find(item => item.id == index).name);
    }

    saveItem() {
      console.log('SAVE', this.todoFrom.get('todoItem').value);
      this.todolistService.updateItem({id: this.editId, name: this.todoFrom.get('todoItem').value});
      this.cancelEdit();
    }

    cancelEdit () {
      this.mode = 'create';
      this.editId = 0;
      this.todoFrom.reset();
    }

    trackByFn(index, item) {
      return index; // or item.id
    }
} 