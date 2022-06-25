export interface ResponsePokemon {
    id:        number;
    name:      string;
    image:     string;
    attack:    number;
    defense:   number;
    hp:        number;
    type:      string;
    id_author: number;
}

export enum TipoAccion {
    Create = 'CREATE',
    Update = 'Update',
    Delete = 'DELETE'
  }
