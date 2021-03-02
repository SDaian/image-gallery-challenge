import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Pagination } from '../../models/pagination';
import { ImageSearchService } from '../../services/image-search.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() pagination: Pagination;
  constructor(private imageSearchService: ImageSearchService) { }

  get numberOfPages(): number {
    return this.pagination.totalCount;
  }

  public getImages(pageNumber: number): void {
    this.imageSearchService.getImages(pageNumber);
  }
}
