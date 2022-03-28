import { ListItem, List, ChecklistApiService } from './../services/checklist-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.page.html',
  styleUrls: ['./view-list.page.scss'],
})
export class ViewListPage implements OnInit {
  public list: List;
  public sortType: string;
  public desc: boolean = false;
  private listID: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private checklistApiService: ChecklistApiService,
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    // get id from routerLink param
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listID = parseInt(id, 10);
    this.list = this.checklistApiService.getCurrentList(this.listID);
    this.sortType = this.list.sorting_method;
    this.desc = !this.list.sorting_reversed
  }

  getListItems(): ListItem[] {
    return this.checklistApiService.getListItems(this.listID);
  }

  async sort_items() {
    let alert = this.alertCtrl.create({
      cssClass: 'unboldLastElement',
      header: 'Sorting Method',
      buttons: [{
        text: 'Alphabetical',
        handler: (data) => {this.checklistApiService.modifyList(this.listID, null, null, "alphabetical", (this.list.sorting_method === "alphabetical")), this.sortType = 'alphabetical', this.desc = !this.list.sorting_reversed}
      }, {
        text: 'Completed',
        handler: (data) => {this.checklistApiService.modifyList(this.listID, null, null, "completed", (this.list.sorting_method === "completed")), this.sortType = 'completed', this.desc = !this.list.sorting_reversed}
      }, {
        text: 'Do By Date',
        handler: (data) => {this.checklistApiService.modifyList(this.listID, null, null, "doByDate", (this.list.sorting_method === "doByDate")), this.sortType = 'doByDate', this.desc = !this.list.sorting_reversed}
      }, {
        text: 'Date Created',
        handler: (data) => {this.checklistApiService.modifyList(this.listID, null, null, "dateCreated", (this.list.sorting_method === "dateCreated")), this.sortType = 'dateCreated', this.desc = !this.list.sorting_reversed}
      }]
    });
    (await alert).present()
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async openAddItemModal() {
    let alert = this.alertCtrl.create({
      header: 'Add Item',
      inputs: [{
        name: 'Name',
        placeholder: 'Item Name',
        attributes: {
          autoComplete: 'off'
        }
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Add',
        handler: (data) => {
          this.addItem(data['Name']);
          this.presentToast("Item successfully added.")
        }
      }]
    });
    (await alert).present()
  }

  addItem(title: string) {
    this.checklistApiService.addItem(this.listID, title);
  }

  removeItem(item: ListItem) {
    this.checklistApiService.removeItem(this.listID, item);
  }

  updateItem(item: ListItem, i: number) {
    this.checklistApiService.updateItem(this.listID, item, i);
  }

  async openEditTitleModal() {
    let alert = this.alertCtrl.create({
      header: 'Edit List Title',
      inputs: [{
        name: 'Title',
        value: this.list.title,
        placeholder: 'List Title',
        attributes: {
          autoComplete: 'off'
        }
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Update',
        handler: async (data) => {
          this.checklistApiService.modifyList(this.listID, data['Title']);
          this.checklistApiService.listModified(this.listID);
          this.presentToast("List successfully updated.")
        }
      }]
    });
    (await alert).present()
  }

}
