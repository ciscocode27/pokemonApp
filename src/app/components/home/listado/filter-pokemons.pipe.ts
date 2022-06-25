import { Pipe, PipeTransform } from '@angular/core';
import { ResponsePokemon } from 'src/app/interfaces/pokemons';


@Pipe({
  name: 'filterPokemons'
})
export class FilterPokemonsPipe implements PipeTransform {

  transform(pokemons:ResponsePokemon[], search?:string): any {
       if( !pokemons ) return null;
       if( !search ) return pokemons;
        console.log(search);

        let stringSearch = search.toLocaleLowerCase();

        return pokemons.filter(pkm=>{
            return pkm.name.toLocaleLowerCase().includes(stringSearch) 
        })

  }

}
