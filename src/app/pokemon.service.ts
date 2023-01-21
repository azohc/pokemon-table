import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonData } from './shared/pokemon-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  nextUrl?: string;
  constructor(private http: HttpClient) {}

  getPokemonData(offset: number, limit: number): Observable<PokemonData> {
    return this.http.get<PokemonData>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}?limit=${limit}`
    );
  }
}
