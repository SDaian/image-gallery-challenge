import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, forkJoin, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as urlTemplate from 'url-template';
import { flatMap, map } from 'rxjs/operators';

import { Pagination } from '../models/pagination';
import { servicesApi } from './api';
import { ImageResponse, Picture } from '../models/image-response';

@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

  private searchResults = new BehaviorSubject<Picture[]>(null);
  private pagination = new BehaviorSubject<Pagination>(null);
  private isSearching = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private SpinnerService: NgxSpinnerService) { }

  public getSearchResults(): Observable<Picture[]> {
    return this.searchResults.asObservable();
  }

  public getIsSearching(): Observable<boolean> {
    return this.isSearching.asObservable();
  }

  public getPagination(): Observable<Pagination> {
    return this.pagination.asObservable();
  }

  public getImages(page: number = 1): void {
    this.isSearching.next(true);
    this.SpinnerService.show();

    const query = page > 1 ? `${servicesApi.images}?page=${page}` : `${servicesApi.images}`;
    this.http.get<ImageResponse>(query).pipe(
      map((response: ImageResponse) => {
        this.pagination.next({
          perPage: 10,
          totalCount: response.pageCount,
          actualPage: page,
        });
        return {
          items: response.pictures,
        };
      }),
      flatMap((response: any) => {
        const imageObservables: Observable<any>[] = response.items.map((item: Picture) => {
          const privacyObservable = this.getInfoByUrl(item.id);
          return concat(privacyObservable);
        });
        return forkJoin(imageObservables);
      })
    ).subscribe((response: Picture[]) => {
      this.searchResults.next(response);
      this.isSearching.next(false);
    });
  }

  public getInfoByUrl(id: string): Observable<{}> {
    const url = urlTemplate.parse(servicesApi.imagesById).expand({
      id: id
    });
    return this.http.get(url);
  }
}
