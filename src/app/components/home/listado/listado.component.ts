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
    typeForm:TipoAccion;
    formAction: FormGroup;
    submitted:boolean = false;
    pokemonUpdate:ResponsePokemon;
    showAlert:boolean = false;
    messageAlert:string = '';
    codeMsg:number = 200;

  constructor(private pokemonService: PokemonService,
    private formBuilder: FormBuilder) { }

  ngOnInit():void {
    this.getAllPokemons();
    this.createFormAction();
  }

   getAllPokemons():void{
    this.pokemonService.getPokemonsByAuthor()
        .subscribe( resp =>{
            console.log(resp)
            this.pokemons = resp;
        })
  }

  createFormAction(){
    this.formAction = this.formBuilder.group(
        {
            name: ['', Validators.required],
            image: ['',Validators.required],
            attack: ['30'],
            defense: ['30']
        }
    )
  }

  get form(){
    return this.formAction.controls;
}

  openForm(type:TipoAccion):void{
        this.activeForm = true;
        this.typeForm = type;
        this.pokemonUpdate = null;
        this.formAction.setValue({
            name: '',
            image : '',
            attack : '30',
            defense : '30'
        });
  }

  updatePokemon(pokemon:ResponsePokemon){
    this.typeForm = TipoAccion.Update;
    this.activeForm = true;
    this.formAction.setValue({
        name: pokemon.name,
        image : pokemon.image,
        attack : pokemon.attack,
        defense : pokemon.defense
    });
    this.pokemonUpdate = pokemon;
  }

  closeForm():void{
    this.activeForm = false;
  }

  savePokemon(){
    console.log(this.formAction.value)
    this.submitted = true;
    if( this.formAction.invalid ){
        return false;
    }
    let idPokemon = null;
    let pokemon = this.formAction.value;
    if( this.typeForm === TipoAccion.Create ){
        pokemon.hp = 100;
        pokemon.type = 'pokemon';
        pokemon.idAuthor = 1;
    }
    if( this.typeForm === TipoAccion.Update ){
        pokemon.hp = this.pokemonUpdate.hp;
        pokemon.type = this.pokemonUpdate.type;
        pokemon.idAuthor =  this.pokemonUpdate.id_author;
        pokemon.id =  this.pokemonUpdate.id;
        idPokemon = this.pokemonUpdate.id
    }
    this.pokemonService.createUpdatePokemon(pokemon, this.typeForm,idPokemon)
        .subscribe( resp=>{
            console.log(resp);
            let typeString:string = 'creado';
            if( this.typeForm === TipoAccion.Update )  typeString = 'actualizado';
            this.getShowAlert(`Pokemon ${typeString} exitosamente!`,200);
            this.getAllPokemons();
            this.submitted = false;
        },error=>{
            this.getShowAlert('Ocurrió un error inesperado!',400);
            this.submitted = false;
        })
  }

  deletePokemon(pokemon:ResponsePokemon){
    this.submitted = true;
    this.activeForm = false;
    this.pokemonService.deletePokemon(pokemon.id)
        .subscribe( resp=>{
            console.log(resp);
            this.getShowAlert(`Pokemon eliminado exitosamente!`,200);
            this.getAllPokemons();
            this.submitted = false;
        },error=>{
            this.submitted = false;
        })
  }

  getShowAlert(msg:string, code:number){
    this.codeMsg = code;
    this.showAlert = true;
    this.messageAlert = msg;
  }

  closeAlert(event){
    this.showAlert = false;
}

}
