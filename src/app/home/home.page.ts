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
  lists: List[] | null = null;

  constructor(private data: DataService, private checklistApiService: ChecklistApiService, public alertController: AlertController) {}

  async ngOnInit() {
    await this.getLists();
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
    this.getLists();
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  async getLists() {
    this.lists = await this.checklistApiService._getLists();
  }

  // add title param to addList when working with modal'
  addList(input: string) {
    this.checklistApiService.addList(input);
  }

  add() {
    return this.data.addItem();
  }

  showAlert() {
    this.alertController.create({
      header: 'Creating List',
      message: 'Please name the list:',
      inputs: [
        {name: 'Name', placeholder: 'Name', attributes: {autoComplete: 'off'}},
      ],
      buttons: [
        {text: 'Cancel', handler: (data: any) => {console.log('Canceled', data)}},
        {text: 'Done!', handler: (data: any) => {this.addList(data['Name'])}}
      ]
    }).then(res => {res.present()});
  }
}
