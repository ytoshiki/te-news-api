import axios, { AxiosPromise, AxiosResponse } from 'axios';

export interface Acceptable {
  author: null | string;
  source: { id: null | number; name: string };
  title: string;
  description: null | string;
  url: string;
  urlToImage: null | string;
  publishedAt: Date;
  content: null | string;
}

export class Search {
  private urlRoot = 'http://newsapi.org/v2';
  private apiKey = 'd61089c5c1e0480cba1911d33f6a4f3a';
  private news: Acceptable[] = [];

  constructor() {
    this.desplayDefault();
  }

  fetch(url: string): void {
    axios
      .get(url)
      .then((response: AxiosResponse) => {
        this.news = response.data.articles;

        const parentElement = document.getElementById('news');
        if (parentElement) {
          parentElement.innerHTML = '';
          this.news.forEach((news) => {
            if (news.urlToImage !== null && news.urlToImage.length > 0) {
              this.view(parentElement, news);
            }
          });
          console.log(this.news);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCategory(category: string): void {
    const categoryTitle = document.querySelector('.news_category');
    if (categoryTitle) {
      categoryTitle.textContent = category;
    }
  }

  desplayDefault(): void {
    const url = this.urlRoot + `/top-headlines?country=us&apiKey=${this.apiKey}`;
    this.fetch(url);
    this.setCategory('Featured');
  }

  searchByKeyword(keyword: string): void {
    const url = this.urlRoot + `/top-headlines?q=${keyword}&from=2021-01-03&sortBy=popularity&apiKey=${this.apiKey}`;
    this.fetch(url);
    this.setCategory('Search Results for ' + keyword);
  }

  private split = (sentence: string): string => {
    const stcArr = sentence.split(' ');
    let result = '';
    for (let i = 0; i < 13; i++) {
      result += `${stcArr[i]} `;
    }

    result += ' ...';
    return result;
  };

  protected view(parent: Element, data: Acceptable) {
    const parentElement = document.createElement('template');
    parentElement.innerHTML = `
    <div class="news_content">
    <div class="image_wrapper" style="background-image : url(${data.urlToImage})">

    </div>
    <h2 class="title">${data.title}</h2>
    <p class="author">${data.author}</p>
    <h3 class="description">${data.description ? this.split(data.description) : ''}</h3>
    <a href="${data.url}" target="_blank">Read More on ${data.source.name}</a>
  
    </div>`;
    parent.appendChild(parentElement.content);
  }
}
