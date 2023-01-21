import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { PaginationState } from '../shared/pagination-state.interface';
import { PokemonData, PokemonDetail } from '../shared/pokemon-data.interface';

@Component({
  selector: 'app-tabular-display',
  templateUrl: './tabular-display.component.html',
  styleUrls: ['./tabular-display.component.sass'],
})
export class TabularDisplayComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  pokemonResponse$ = new BehaviorSubject<PokemonData | null>(null);
  pokemonResults$ = this.pokemonResponse$.pipe(map((data) => data?.results));

  isLoading = false;

  paginationState: PaginationState = {
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    pageSizes: [5, 10, 20, 50, 100],
  };

  constructor(private pokemonService: PokemonService) {}

  get currentPageAsOffset() {
    return (
      (this.paginationState.currentPage - 1) * this.paginationState.pageSize
    );
  }

  ngOnInit() {
    this.getPokemonData(
      this.currentPageAsOffset,
      this.paginationState.pageSize
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getPokemonData(offset: number, limit: number) {
    this.isLoading = true;
    this.pokemonService.getPokemonData(offset, limit).subscribe((data) => {
      this.paginationState.totalPages = Math.ceil(
        data.count / this.paginationState.pageSize
      );
      this.pokemonResponse$.next(data);
      this.isLoading = false;
    });
  }

  previousPage() {
    this.paginationState.currentPage--;
    this.getPokemonData(
      this.currentPageAsOffset,
      this.paginationState.pageSize
    );
  }

  nextPage() {
    this.paginationState.currentPage++;
    this.getPokemonData(
      this.currentPageAsOffset,
      this.paginationState.pageSize
    );
  }

  firstPage() {
    this.paginationState.currentPage = 1;
    this.getPokemonData(
      this.currentPageAsOffset,
      this.paginationState.pageSize
    );
  }

  lastPage() {
    this.paginationState.currentPage = this.paginationState.totalPages;
    this.getPokemonData(
      this.currentPageAsOffset,
      this.paginationState.pageSize
    );
  }

  changePageSize(size: number) {
    this.paginationState.pageSize = size;
    this.paginationState.currentPage = 1;
    this.getPokemonData(
      this.currentPageAsOffset,
      this.paginationState.pageSize
    );
  }
}
