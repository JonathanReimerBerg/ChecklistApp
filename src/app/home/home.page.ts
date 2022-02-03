import { ChecklistApiService, List } from './../services/checklist-api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService, private checklistApiService: ChecklistApiService, public alertController: AlertController) {}

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

  showAlert() {
    this.alertController.create({
      header: 'Creating List',
      message: 'Please name the list:',
      inputs: [
        {name: 'Name', placeholder: 'Name'},
      ],
      buttons: [
        {text: 'Cancel', handler: (data: any) => {console.log('Canceled', data)}},
        {text: 'Done!', handler: (data: any) => {console.log('Saved Information', data)}}
      ]
    }).then(res => {res.present()});
  }
}
