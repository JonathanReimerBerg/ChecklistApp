import { ChecklistApiService } from './services/checklist-api.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SortPipe } from './sort.pipe';
import { DaysUntilDuePipe } from './days-until-due.pipe';

@NgModule({
  declarations: [AppComponent, SortPipe, DaysUntilDuePipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ChecklistApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
