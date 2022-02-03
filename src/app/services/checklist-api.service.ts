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

  public listItems: ListItem[] = [
    {
      id: 1,
      item_name: 'Apple Juice',
      date_created: '1/27/2022',
      checked: false
    },
    {
      id: 2,
      item_name: 'Milk',
      date_created: '1/15/2022',
      checked: false
    },
    {
      id: 1,
      item_name: 'Pistachios',
      date_created: '1/23/2022',
      checked: false
    }
  ]

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    this.lists = await storage.get('lists') || [];
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public getLists(): List[] {
    return this.lists;
  }

  public addList(title: string) {
    let curLists = this.getLists();
    let timeElasped = Date.now();
    let newList = {
      id: this.generateUniqueID(),
      title: title,
      date_modified: new Date(timeElasped).toLocaleDateString()
    };

    curLists.push(newList);

    this.set('lists', curLists);
  }

  public getCurrentList(id: number): List {
    return this.lists.find(list => list.id === id)
  }

  public getListItems(id: number): ListItem[] {
    // we only want the list items for the selected list
    return this.listItems.filter(item => item.id === id);
  }

  public generateUniqueID(): number {
    // this returns the number of miliseconds elapsed since January 1, 1970.
    // We are assuming this will be unique (unless it is ran multiple times per milisecond
    // which should not be possible in our use cases).
    return Date.now();
  }
}
