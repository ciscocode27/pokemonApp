import { Component, OnInit } from '@angular/core';
import { ResponsePokemon } from 'src/app/interfaces/pokemons';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

    pokemons: ResponsePokemon[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getAllPokemons();
  }

   getAllPokemons(){
    this.pokemonService.getPokemonsByAuthor(1)
        .subscribe( resp =>{
            console.log(resp)
            this.pokemons = resp;
        })
  }

}
