import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule ],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class ListComponentModule {}
