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
    //storage.clear()

    this.lists = await storage.get('lists') || [];
    this.items = await storage.get('items') || [];
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
    console.log(key, value)
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

    let curLists = this.getLists();

    curLists.push(newList);
    this.set('lists', curLists);
  }

  public modifyList(id: number, title?: string, date_modified?: string) {
    let list = this.getCurrentList(id);

    if (date_modified) {
      list.date_modified = date_modified;
    }
    if (title) {
      list.title = title;
    }

    this.saveList(id, list);
  }

  public saveList(id: number, updatedList: List) {
    let curLists = this.getLists();
    let listToUpdateIndex = this.getCurrentListIndex(id);

    curLists[listToUpdateIndex] = updatedList;
    this.set('lists', curLists);

  }

  public listModified(listID: number) {
    let timeElasped = Date.now();
    // update the date_modified attribute of the list to show that it was modified
    this.modifyList(listID, null, new Date(timeElasped).toLocaleDateString());
  }

  public getCurrentList(id: number): List {
    return this.lists.find(list => list.id === id);
  }

  public getCurrentListIndex(id: number): number {
    return this.lists.findIndex(list => list.id === id);
  }

  public getListItems(id: number) {
    let listItems = this.items.find(itemGroup => itemGroup.find(item => item.id === id))
    return listItems || [];
  }

  public getListItemsIndex(id: number) {
    let listItemGroupIndex = this.items.findIndex(itemGroup => itemGroup.find(item => item.id === id))
    return listItemGroupIndex;
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
    let index = this.getListItemsIndex(listID);
    // remove old instance of item group
    if (index > -1) {
      this.items.splice(index, 1);
    }

    // push updated item group
    this.items.push(curItems);
    
    this.listModified(listID);

    this.set('items', this.items);
  }

  public removeItem(listID: number, item: ListItem) {
    let curItems = this.getListItems(listID);

    let index = curItems.findIndex(listItem => listItem.item_name == item.item_name);
    if (index > -1) {
      curItems.splice(index, 1);
    }

    let oldIndex = this.getListItemsIndex(listID);
    // remove old instance of item group
    if (oldIndex > -1) {
      this.items.splice(oldIndex, 1);
    }
    this.items.push(curItems);

    this.listModified(listID);

    this.set('items', this.items);
  }

  public updateItem(listID: number, item: ListItem, index: number) {
    let curItems = this.getListItems(listID);
    curItems[index] = item;

    let oldIndex = this.getListItemsIndex(listID);
    // remove old instance of item group
    if (oldIndex > -1) {
      this.items.splice(oldIndex, 1);
    }
    this.items.push(curItems);
    this.listModified(listID);

    this.set('items', this.items);
  }

  public removeList(item: List){
    let listID = (item[Object.keys(item)[0]])
    let curLists = this.getLists();

    let index = curLists.findIndex(listItem => listItem.id == listID); 

    if (index > -1) {
      curLists.splice(index, 1);
    }
    this.set('lists', curLists);
  }

  public sort(method: String){
    console.log(method)
  }
}