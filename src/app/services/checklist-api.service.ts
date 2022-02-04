import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

interface MetaList {
  id: number;
}

export interface List extends MetaList {
  title: string;
  date_modified: string;
}

export interface ListItem extends MetaList {
  item_name: string;
  date_created: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistApiService {

  public _storage: Storage | null = null;
  public lists: List[] | null = [];
  public items: ListItem[][] | null = [];

  public listItems: ListItem[] | null = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    this.lists = await storage.get('lists') || [];
    this.items = await storage.get('items') || [];
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public getLists(): List[] {
    return this.lists;
  }

  public addList(title: string) {
    let timeElasped = Date.now();
    let newList = {
      id: this.generateUniqueID(),
      title: title,
      date_modified: new Date(timeElasped).toLocaleDateString()
    };

    this.saveLists(newList);
  }

  public modifyList(id: number, title?: string, date_modified?: string) {
    let list = this.getCurrentList(id);

    if (date_modified) {
      list.date_modified = date_modified;
    }
    if (title) {
      list.title = title;
    }

    this.saveLists(list);

  }

  public saveLists(list: List) {
    let curLists = this.getLists();

    curLists.push(list);
    this.set('lists', curLists);

  }

  public listModified(listID: number) {
    let timeElasped = Date.now();
    // update the date_modified attribute of the list to show that it was modified
    this.modifyList(listID, null, new Date(timeElasped).toLocaleDateString());
  }

  public getCurrentList(id: number): List {
    return this.lists.find(list => list.id === id)
  }

  public getListItems(id: number) {
    let listItems = this.items.find(itemGroup => itemGroup.find(item => item.id === id))
    return listItems || [];
  }

  public generateUniqueID(): number {
    // this returns the number of miliseconds elapsed since January 1, 1970.
    // We are assuming this will be unique (unless it is ran multiple times per milisecond
    // which should not be possible in our use cases).
    return Date.now();
  }
  public addItem(listID: number, title: string) {
    let curItems = this.getListItems(listID);
    let timeElasped = Date.now();
    let currentDate = new Date(timeElasped).toLocaleDateString()
    let newItem = {
      id: listID,
      item_name: title,
      date_created: currentDate,
      checked: false
    };

    curItems.push(newItem);
    this.items.push(curItems);
    
    this.listModified(listID)

    this.set('items', this.items);
  }

}