export interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
    detail: PokemonDetail;
  }>;
}

export interface PokemonDetail {
  id: number;
  weight: number;
  types: Array<PokemonType>;
  sprites: {
    front_default: string;
  };
}

export interface PokemonType {
  type: { name: string };
}
