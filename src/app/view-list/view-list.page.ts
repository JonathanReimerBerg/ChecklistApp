import { ListItem, List, ChecklistApiService } from './../services/checklist-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.page.html',
  styleUrls: ['./view-list.page.scss'],
})
export class ViewListPage implements OnInit {
  public listItems: ListItem[];
  public list: List;

  constructor(
    private activatedRoute: ActivatedRoute,
    private checklistApiService: ChecklistApiService,
  ) { }

  ngOnInit() {
    // get id from routerLink param
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listItems = this.checklistApiService.getListItems(parseInt(id, 10));
    this.list = this.checklistApiService.getCurrentList(parseInt(id, 10));
  }

}
