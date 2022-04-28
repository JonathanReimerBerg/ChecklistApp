import { FilterListsPipe } from './../filter-lists.pipe';
import { SortlistsPipe } from './../sortlists.pipe';
import { SortPipe } from './../sort.pipe';
import { ListComponentModule } from './../list/list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MessageComponentModule } from '../message/message.module';
import { Ng2SearchPipeModule} from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    ListComponentModule,
    HomePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [HomePage, SortlistsPipe, FilterListsPipe]
})
export class HomePageModule {}
