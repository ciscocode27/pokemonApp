import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponsePokemon, TipoAccion } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

    baseUrlApiPokemon = environment.baseUrlApiPokemon;
    author = 1;

  constructor(private http: HttpClient) { }

  get headers(){
    return new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
  }

  getPokemonsByAuthor(): Observable<ResponsePokemon[]>{
    return this.http.get<ResponsePokemon[]>(`${this.baseUrlApiPokemon}/?idAuthor=${this.author}`, {headers: this.headers} );
  }

  createUpdatePokemon(pokemon:ResponsePokemon,type:TipoAccion,idPokemon?:number){
    if( type === TipoAccion.Create ){
        return this.http.post(`${this.baseUrlApiPokemon}/?idAuthor=${this.author}`, pokemon, {headers: this.headers});
    }else{
        return this.http.put(`${this.baseUrlApiPokemon}/${idPokemon}`, pokemon, {headers: this.headers});
    }
    
  }

  deletePokemon(idPokemon:number){
    return this.http.delete(`${this.baseUrlApiPokemon}/${idPokemon}`,{headers: this.headers});
  }


}
