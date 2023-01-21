import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationState } from '../shared/pagination-state.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass'],
})
export class PaginationComponent implements OnInit {
  @Input()
  paginationState?: PaginationState = {
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    pageSizes: [5, 10, 20, 50, 100],
  };

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
