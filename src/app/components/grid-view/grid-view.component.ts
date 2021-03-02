import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageResponse, Picture } from 'src/app/models/image-response';
import { Pagination } from 'src/app/models/pagination';

import { ImageSearchService } from '../../services/image-search.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {

  show: boolean = false;
  image: Picture;

  imagesResponse$: Observable<Picture[]>;
  isSearching$: Observable<boolean>;
  pagination$: Observable<Pagination>;

  constructor(private imageSearchService: ImageSearchService) { }

  ngOnInit(): void {
    this.imageSearchService.getImages();
    this.isSearching$ = this.imageSearchService.getIsSearching();
    this.pagination$ = this.imageSearchService.getPagination();
    this.imagesResponse$ = this.imageSearchService.getSearchResults();
  }

  openImage(image: Picture): void {
    console.log(image);
    this.image = image;
    this.toggleShow();
  }

  toggleShow(): void {
    this.show = !this.show;
    if(!this.show) {
      this.image = null;
    }
  }
}
