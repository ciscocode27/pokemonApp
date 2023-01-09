import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponsePokemon, TipoAccion } from 'src/app/interfaces/pokemons';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

    pokemons: ResponsePokemon[] = [];
    nameFilter:string;
    activeForm:boolean = false;
    showAlert:boolean = false;
    messageAlert:string = '';
    codeMsg:number = 200;
    listEnumTypes = TipoAccion;
    noData:boolean = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit():void {
    this.getAllPokemons();
  }

   getAllPokemons():void{
    this.pokemonService.getPokemonsByAuthor()
        .subscribe( resp =>{
            this.pokemons = resp;
            if( this.pokemons.length === 0 ) this.noData = true;
        },error=>{
            this.getShowAlert(`Ocurrió un error inesperado!`,400);
        })
  }

  deletePokemon(pokemon:ResponsePokemon){
    if(  confirm(`¿Estás seguro que deseas eliminar al pokemon ${pokemon.name} ?`) ){
      this.pokemonService.deletePokemon(pokemon.id)
          .subscribe( resp=>{
              this.getShowAlert(`Pokemon eliminado exitosamente!`,200);
              this.getAllPokemons()
          },error=>{
            this.getShowAlert(`Ocurrió un error inesperado!`,400);
          })
    }
    
  }

  updatePokemon(pokemon:ResponsePokemon){
    this.pokemonService.eventoFormulario.emit(
        {
            formOpen: true,
            typeForm : TipoAccion.Update,
            pokemon: pokemon
        }
    );
  }



  getShowAlert(msg:string, code:number){
    this.codeMsg = code;
    this.showAlert = true;
    this.messageAlert = msg;
  }

  closeAlert(event){
    this.showAlert = false;
}

onErrorImage(pokemon:ResponsePokemon){
    pokemon.image = 'https://www.audicomer.com.ec/wp-content/themes/consultix/images/no-image-found-360x260.png';
}

openForm(type:TipoAccion){
    this.pokemonService.eventoFormulario.emit(
        {
            formOpen: true,
            typeForm : type
        }
    )
}

}
