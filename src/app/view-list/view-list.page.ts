import { ListItem, List, ChecklistApiService } from './../services/checklist-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.page.html',
  styleUrls: ['./view-list.page.scss'],
})
export class ViewListPage implements OnInit {
  private list: List;
  private listID: any;
  private listItems: ListItem[] | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private checklistApiService: ChecklistApiService,
    private alertCtrl: AlertController
  ) { }

  async ngOnInit() {
    // get id from routerLink param
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listID = id;
    
    await this.getList(id);
    await this.getListItems(id);
  }

  async getListItems(id) {
    this.listItems = await this.checklistApiService._getListItems(id);
  }

  async getList(id) {
    this.list = await this.checklistApiService._getList(id);
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
        }
      }]
    });
    (await alert).present()
  }

  async addItem(name: string) {
    this.checklistApiService._addItem(this.listID, name);
    // update the list's date to show that it has been modified
    this.checklistApiService._updateList(this.listID);
    
    // refresh twice to fix caching bug
    await this.getListItems(this.listID);
    await this.getListItems(this.listID);
  }

  async removeItem(itemID: number) {
    this.checklistApiService._removeItem(this.listID, itemID);
    // update the list's date to show that it has been modified
    this.checklistApiService._updateList(this.listID);

    await this.getListItems(this.listID);
    await this.getListItems(this.listID);
  }

  updateItem(item: ListItem, i: number) {
    this.checklistApiService.updateItem(this.listID, item, i);
  }

  _updateItem(item: ListItem) {
    this.checklistApiService._updateItem(this.listID, item);
    // update the list's date to show that it has been modified
    this.checklistApiService._updateList(this.listID);
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
          this.checklistApiService._updateList(this.listID, data['Title']);
          await this.getList(this.listID);
          await this.getList(this.listID);
        }
      }]
    });
    (await alert).present()
  }

}
