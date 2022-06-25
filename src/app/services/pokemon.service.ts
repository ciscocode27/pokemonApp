import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponsePokemon } from '../interfaces/pokemons';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

    baseUrlApiPokemon = environment.baseUrlApiPokemon;

  constructor(private http: HttpClient) { }

  get headers(){
    return new HttpHeaders({'Content-Type':'application/json; charset=utf-8' });
  }

  getPokemonsByAuthor(author:number): Observable<ResponsePokemon[]>{
    return this.http.get<ResponsePokemon[]>(`${this.baseUrlApiPokemon}/?idAuthor=${author}`, {headers: this.headers} );
  }


}
