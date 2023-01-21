export interface PokemonData {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonDetail {
  weight: number;
  types: Array<PokemonType>;
  sprites: {
    front_default: string;
  };
}

export interface PokemonType {
  type: { name: string };
}
