export abstract class Listener {
  public searchButton = document.querySelector('.search_button');
  public searchInput = document.querySelector('.search_input');
  public keyWord: string = '';

  abstract searchByKeyword(keyword: string): void;

  constructor() {
    this.listenEvent();
  }

  listenEvent = (): void => {
    if (this.searchButton) {
      this.searchButton.addEventListener('click', (): void => {
        if (this.keyWord) {
          this.searchByKeyword(this.keyWord);
        }
        this.keyWord = '';
        const input = this.searchInput as HTMLTextAreaElement;
        input.value = '';
      });
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e: Event): void => {
        const event = e.currentTarget as HTMLTextAreaElement;
        if (event.value) {
          this.keyWord = event.value;
        }
      });
    }
  };
}
