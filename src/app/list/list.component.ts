import { HomePage } from './../home/home.page';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { appInitialize } from '@ionic/angular/app-initialize';
import { ChecklistApiService, List, ListItem } from './../services/checklist-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list: List;

  constructor(private checklistApiService: ChecklistApiService,public alertController: AlertController, public homePage: HomePage) { }

  ngOnInit() {}

  removeList(itemID: number){
    this.alertController.create({
      header: 'Warning: Deleting List',
      message: 'Are you sure you want to delete the list?',
      buttons: [
        {text: 'Cancel', handler: (data: any) => {console.log('Canceled', this.list)}},
        {text: 'Delete', handler: async (data: any) => {
          this.checklistApiService._removeList(this.list.id);
          await this.homePage.getLists()
          await this.homePage.getLists()
        }}
      ]
    }).then(res => {res.present()});
  }
}
