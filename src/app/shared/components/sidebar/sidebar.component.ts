import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor( private gifsService: GifsService ) { }

  get listHistory(): string[] {
    const list = this.gifsService.history;
    // devuelve un maximo de 10 elementos
      return list.slice(0, 10);
  }
}
