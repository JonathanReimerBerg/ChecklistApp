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
        handler: (data) => {
          this.checklistApiService.modifyList(this.listID, null, null, "alphabetical", (this.list.sorting_method === "alphabetical")), this.sortType = 'alphabetical', this.desc = !this.list.sorting_reversed
          this.checklistApiService.presentToast(`Sorting alphabetically (${this.desc ? 'Desc': 'Asc'})`, 3000);
        }
      }, {
        text: 'Completed',
        handler: (data) => {
          this.checklistApiService.modifyList(this.listID, null, null, "completed", (this.list.sorting_method === "completed")), this.sortType = 'completed', this.desc = !this.list.sorting_reversed
          this.checklistApiService.presentToast(`Sorting via completion (${this.desc ? 'Desc': 'Asc'})`, 3000);
        }
      }, {
        text: 'Do By Date',
        handler: (data) => {
          this.checklistApiService.modifyList(this.listID, null, null, "doByDate", (this.list.sorting_method === "doByDate")), this.sortType = 'doByDate', this.desc = !this.list.sorting_reversed
          this.checklistApiService.presentToast(`Sorting via do by date (${this.desc ? 'Desc': 'Asc'})`, 3000);
        }
      }, {
        text: 'Date Created',
        handler: (data) => {
          this.checklistApiService.modifyList(this.listID, null, null, "dateCreated", (this.list.sorting_method === "dateCreated")), this.sortType = 'dateCreated', this.desc = !this.list.sorting_reversed
          this.checklistApiService.presentToast(`Sorting via date created (${this.desc ? 'Desc': 'Asc'})`, 3000);
        }
      }]
    });
    (await alert).present()
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
          if (data['Name'].trim()) {
            this.addItem(data['Name'].trim());
            this.checklistApiService.presentToast("Item successfully added.")
          } else {
            this.checklistApiService.presentToast("Item name cannot be blank.", null, "top", "danger");
            return false;
          }
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
          this.checklistApiService.presentToast("List successfully updated.")
        }
      }]
    });
    (await alert).present()
  }

  async setDueByDate(item: ListItem, index: number) {
    let alert = this.alertCtrl.create({
      header: 'Set Due By Date',
      inputs: [{
        name: 'Date',
        attributes: {
          autoComplete: 'off'
        },
        type: 'date'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Set',
        handler: async (data) => {
          if(data['Date'].trim()) {
            // reformat date
            let date = data['Date'];
            date = date.split("-");
            date.push(date.shift());
            date = date.join("/");

            item.due_by_date = date;
            this.updateItem(item, index);
            this.checklistApiService.presentToast(`Item due by ${date}`);
          } else {
            item.due_by_date = "";
            this.updateItem(item, index);
            this.checklistApiService.presentToast('Due by date removed.')

          }
        }
      }]
    });
    (await alert).present()
  }

}
