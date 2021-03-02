import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

import { Picture } from 'src/app/models/image-response';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {

  @Input() image: Picture;

  @Output() showImageDetailed: EventEmitter<Picture> = new EventEmitter<Picture>();

  constructor() { }

  ngOnInit(): void {
  }

}
