import { HomePage } from './../home/home.page';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { appInitialize } from '@ionic/angular/app-initialize';
import { ChecklistApiService, List, ListItem } from './../services/checklist-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() list: List;
  private listID: number;

  constructor(
    private checklistApiService: ChecklistApiService,
    public alertController: AlertController,
    public toastController: ToastController,
    public homePage: HomePage
    ) { }

  ngOnInit() {}

  removeList(){
    this.alertController.create({
      header: 'Warning: Deleting List',
      message: 'Are you sure you want to delete the list?',
      buttons: [
        {text: 'Cancel', handler: (data: any) => {console.log('Canceled', this.list)}},
        {text: 'Delete', handler: (data: any) => {
          this.checklistApiService.removeList(this.list);
          this.checklistApiService.presentToast("List deleted.");
        }}
      ]
    }).then(res => {res.present()});
  }

  incompleteList() {
    this.checklistApiService.modifyList(this.list.id, null, null, null, null, null, "incomplete");
    this.checklistApiService.presentToast("List marked as incomplete.");
    this.homePage.ionViewWillEnter();
  }
}
