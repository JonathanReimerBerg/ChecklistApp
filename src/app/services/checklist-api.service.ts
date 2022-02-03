import { Storage } from '@ionic/storage-angular';

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

export class ChecklistApiService {

  public lists: List[] = [
    {
      id: 1,
      title: 'Grocery List',
      date_modified: '2/10/2001'
    },
    {
      id: 2, 
      title: 'Other Grocery list',
      date_modified: '2/10/2002'
    }
  ]

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

  constructor() { }

  public getLists(): List[] {
    return this.lists;
  }

  public getCurrentList(id: number): List {
    return this.lists.find(list => list.id === id)
  }

  public getListItems(id: number): ListItem[] {
    // we only want the list items for the selected list
    return this.listItems.filter(item => item.id === id);
  }
}
