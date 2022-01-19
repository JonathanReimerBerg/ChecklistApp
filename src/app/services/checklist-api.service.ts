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
    }
  ]

  constructor() { }

  public getLists(): List[] {
    return this.lists;
  }
}
