import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { PaginationState } from '../shared/pagination-state.interface';

@Component({
  selector: 'app-tabular-display',
  templateUrl: './tabular-display.component.html',
  styleUrls: ['./tabular-display.component.sass'],
})
export class TabularDisplayComponent implements OnInit {
  pokemon: any;
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

  getPokemonData(offset: number, limit: number) {
    this.isLoading = true;
    this.pokemonService.getPokemonData(offset, limit).subscribe((data) => {
      this.pokemon = data;
      this.pokemonService.nextUrl = this.pokemon.next;
      this.paginationState.totalPages = Math.ceil(
        this.pokemon.count / this.paginationState.pageSize
      );
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
    // this.getPokemonData((this.totalPages - 1) * this.pageSize, this.pageSize);
    // this.currentPage = this.totalPages;
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
