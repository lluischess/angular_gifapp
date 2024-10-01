import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

const GUPHY_API_KEY = '6k2OHU32APOAo9tmPfv6jV5PV32lPw99';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
   }

  private tagsHistory: string[] = [];
  public gifList: Gif[] = [];

  get history(): string[] {
    return [...this.tagsHistory];
  }

  private organizeHistory(tag: string): void {
   tag = tag.toLowerCase();

   if (this.tagsHistory.includes(tag)) {
     this.tagsHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
   }
   this.tagsHistory.unshift(tag);
   this.saveLocalStorage();
  }

private saveLocalStorage(): void {
      localStorage.setItem('history', JSON.stringify(this.tagsHistory));
    }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) {
      return;
    }
    this.tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this.tagsHistory[0]);
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    this.http.get<SearchResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${GUPHY_API_KEY}&q=${tag}&limit=10`)
    .subscribe((res) => {

      // Guardar la lista de gifs de la api
      this.gifList = res.data;
      console.log(this.gifList);
    });



    // Manera a lo fetch con JS
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=6k2OHU32APOAo9tmPfv6jV5PV32lPw99&q=lol&limit=10')
    // .then((res) => res.json())
    // .then((res) => console.log(res));
  }
}
