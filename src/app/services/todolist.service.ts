import { EventEmitter } from '@angular/core';
import { TodoItem } from '../interfaces/TodoItem';

export class TodoListService {
    todoListChanged = new EventEmitter<TodoItem[]>();

    private listItems: TodoItem[] = [
        {id: 1, name: 'Wake up at 7.00 at the morning'},
        {id: 2, name: 'Do yoga'},
        {id: 3, name: 'Go for run'}
    ];
    
    private getMaxID() {
        return this.listItems.reduce((max, p) => p.id > max ? p.id : max, this.listItems[0].id);
      }

    getTodoList = () => {
        return this.listItems.slice();
    }

    addItemToList = (itemName: string) => {
        const maxId = this.listItems
        this.listItems.push({id: this.getMaxID() + 1, name: itemName}); 
        this.todoListChanged.emit(this.listItems.slice());
    }

    deleteItemFromList = (id: number) => {
        this.listItems = this.listItems.filter(item => item.id !== id); 
        this.todoListChanged.emit(this.listItems.slice());
    }

    updateItem = (todoItem: TodoItem) => {
        this.listItems.find(item => item.id == todoItem.id).name = todoItem.name;
        this.todoListChanged.emit(this.listItems.slice());
    }
};