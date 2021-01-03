import { Search } from './Search';
import { Listener } from './Listener';

class News extends Listener {
  public search: Search;

  constructor() {
    super();
    this.search = new Search();
  }

  searchByKeyword(keyword: string): void {
    this.search.searchByKeyword(keyword);
  }
}

const init = new News();
