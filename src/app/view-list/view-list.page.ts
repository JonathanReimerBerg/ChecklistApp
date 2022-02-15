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
  public list: List;
  private listID: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private checklistApiService: ChecklistApiService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // get id from routerLink param
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listID = parseInt(id, 10);
    this.list = this.checklistApiService.getCurrentList(this.listID);
  }

  getListItems(): ListItem[] {
    return this.checklistApiService.getListItems(this.listID);
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

  addItem(title: string) {
    this.checklistApiService.addItem(this.listID, title);
  }

  removeItem(item: ListItem) {
    this.checklistApiService.removeItem(this.listID, item);
  }

  updateItem(item: ListItem, i: number) {
    this.checklistApiService.updateItem(this.listID, item, i);
  }

}
