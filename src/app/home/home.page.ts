import { ChecklistApiService, List } from './../services/checklist-api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService, private checklistApiService: ChecklistApiService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getLists(): List[] {
    return this.checklistApiService.getLists();
  }

  // add title param to addList when working with modal'
  addList() {
    this.checklistApiService.addList('this is a test list');
  }

  add() {
    return this.data.addItem();
  }

}
