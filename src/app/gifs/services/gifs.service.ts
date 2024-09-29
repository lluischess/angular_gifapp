import { Injectable } from '@angular/core';

const GUPHY_API_KEY = '6k2OHU32APOAo9tmPfv6jV5PV32lPw99';
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private tagsHistory: string[] = [];

  get history(): string[] {
    return [...this.tagsHistory];
  }

  private organizeHistory(tag: string): void {
   tag = tag.toLowerCase();

   if (this.tagsHistory.includes(tag)) {
     this.tagsHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
   }
   this.tagsHistory.unshift(tag);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
  }
}
