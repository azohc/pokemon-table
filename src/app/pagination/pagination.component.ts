import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationState } from '../shared/pagination-state.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input()
  paginationState!: PaginationState;

  @Output()
  firstPageClicked = new EventEmitter();

  @Output()
  previousPageClicked = new EventEmitter();

  @Output()
  nextPageClicked = new EventEmitter();

  @Output()
  lastPageClicked = new EventEmitter();

  @Output()
  pageSizeChanged = new EventEmitter();

  ngOnInit(): void {}
}
