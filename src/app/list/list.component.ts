import { HomePage } from './../home/home.page';
import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    private navCtrl: NavController,
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

  async checkLocked() {
    if (this.list.locked) {
      let alert = this.alertCtrl.create({
        header: 'Unlock List',
        cssClass: 'whiteBackground',
        backdropDismiss: false,
        inputs: [{
          name: 'Password',
          placeholder: 'Password',
          attributes: {
            autoComplete: 'off'
          },
          type: 'password'
        }],
        buttons: [{
          text: 'Cancel',
          handler: () => {
            this.navCtrl.navigateBack('/home');
          }
        }, {
          text: 'Unlock',
          handler: (data) => {
            if (data['Password'] === this.list.locked) {
              this.navCtrl.navigateForward('/list/' + this.list.id);
              this.checklistApiService.presentToast("List unlocked.");
            } else {
              this.checklistApiService.presentToast("Password is incorrect", null, "top", "danger");
              return false;
            }
          }
        }]
      });
      (await alert).present();
    } else {
      this.navCtrl.navigateForward('/list/' + this.list.id);
    }
  }
}
