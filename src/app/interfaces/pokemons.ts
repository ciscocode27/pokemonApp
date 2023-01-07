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

export interface eventoForm{
    formOpen:    boolean;
    typeForm?:    TipoAccion;
    pokemon?:    ResponsePokemon,
    message?:    message
}

interface message{
    title:  string;
    code:   number;
}
