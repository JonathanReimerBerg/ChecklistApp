import { ChecklistApiService, List } from './../services/checklist-api.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public _reload;
  
  searchTerm: string;
  search: boolean = false;

  filterType: string = "all";

  constructor(
    private data: DataService,
    private checklistApiService: ChecklistApiService,
    public alertController: AlertController,
    public toastController: ToastController
    ) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  ionViewWillEnter() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

  reload() {
    setTimeout(() => this._reload = false);
    setTimeout(() => this._reload = true);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  getLists(): List[] {
    return this.checklistApiService.getLists();
  }

  async showHelp() {
    await Browser.open({ url: 'https://docs.google.com/document/d/1hubrJOZ1Mj9sU3J5xrwBuCJOqpYOQk1zKjT0WpAol5I/edit?usp=sharing' });
  }

  // add title param to addList when working with modal'
  addList(input: string) {
    this.checklistApiService.addList(input);
    this.ionViewWillEnter();
    this.checklistApiService.presentToast("List successfully added.")
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
        {text: 'Done!', handler: (data: any) => {
          if (data['Name'].trim()) {
            this.addList(data['Name'].trim());
            this.checklistApiService.presentToast("List successfully added.")
          } else {
            this.checklistApiService.presentToast("List name cannot be blank.", null, "top", "danger");
            return false;
          }
        }}
      ]
    }).then(res => {res.present()});
  }

  Notify() {
    alert('Here is your notificaiton!')
  }

  ViewLockedLists() {
    alert('No Locked lists applicable yet sorry.')
  }

  Share() {
    alert('Share is not working.')
  }

  Search() {
    alert("Seach elsewhere")
  }

  SelfDriving() {
    alert("Still in Beta driving mode.")
  }
 
  ReviewApp() {
    alert('Five Stars?')
  }

  showSearchBar() {
    this.search = true;
  }
  hideSearchBar() {
    this.search = false;
    this.searchTerm = "";
  }

  toggleListTypes(e) {
    let value = e.detail.value;
    this.filterType = value;
  }
 
}


