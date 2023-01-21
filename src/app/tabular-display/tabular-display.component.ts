import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-tabular-display',
  templateUrl: './tabular-display.component.html',
  styleUrls: ['./tabular-display.component.sass'],
})
export class TabularDisplayComponent implements OnInit {
  pokemon: any;
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  pageSizes = [5, 10, 20, 50, 100];
  isLoading = false;

  constructor(private pokemonService: PokemonService) {}

  get currentPageAsOffset() {
    return (this.currentPage - 1) * this.pageSize;
  }

  ngOnInit() {
    this.getPokemonData(this.currentPageAsOffset, this.pageSize);
  }

  getPokemonData(offset: number, limit: number) {
    this.isLoading = true;
    this.pokemonService.getPokemonData(offset, limit).subscribe((data) => {
      this.pokemon = data;
      this.pokemonService.nextUrl = this.pokemon.next;
      this.totalPages = Math.ceil(this.pokemon.count / this.pageSize);
      this.isLoading = false;
    });
  }

  previousPage() {
    this.currentPage--;
    this.getPokemonData(this.currentPageAsOffset, this.pageSize);
  }

  nextPage() {
    this.currentPage++;
    this.getPokemonData(this.currentPageAsOffset, this.pageSize);
  }

  firstPage() {
    this.currentPage = 1;
    this.getPokemonData(this.currentPageAsOffset, this.pageSize);
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.getPokemonData(this.currentPageAsOffset, this.pageSize);
    // this.getPokemonData((this.totalPages - 1) * this.pageSize, this.pageSize);
    // this.currentPage = this.totalPages;
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
    this.getPokemonData(this.currentPageAsOffset, this.pageSize);
  }
}
