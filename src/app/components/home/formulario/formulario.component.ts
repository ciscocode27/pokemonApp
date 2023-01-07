import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { eventoForm, ResponsePokemon, TipoAccion } from 'src/app/interfaces/pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

    typeForm:TipoAccion;
    formAction: FormGroup;
    submitted:boolean = false;
    pokemonUpdate:ResponsePokemon;
    activeForm:boolean = false;
    listEnumTypes = TipoAccion;
    message = {
        title: '',
        code: null
    };
    urlValida:boolean = true;;

    @Input() datosForm:eventoForm;
    imagePattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  constructor(private pokemonService: PokemonService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.typeForm = this.datosForm.typeForm;
    this.createFormAction();
    if(  this.typeForm === this.listEnumTypes.Update ){
        this.updatePokemon(this.datosForm.pokemon);
    }
  }

  createFormAction(){
    this.formAction = this.formBuilder.group(
        {
            name: ['', Validators.required],
            image: ['', [ Validators.required, Validators.pattern(this.imagePattern) ] ],
            attack: ['30'],
            defense: ['30']
        }
    )
  }

  get form(){
    return this.formAction.controls;
}


  updatePokemon(pokemon:ResponsePokemon){
    this.formAction.setValue({
        name: pokemon.name,
        image : pokemon.image,
        attack : pokemon.attack,
        defense : pokemon.defense
    });
    this.pokemonUpdate = pokemon;
  }

  savePokemon(){
    this.submitted = true;

    if( this.formAction.invalid  ){
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
        idPokemon = this.pokemonUpdate.id;
        pokemon.idAuthor = 1;
    }
    this.pokemonService.createUpdatePokemon(pokemon, this.typeForm,idPokemon)
        .subscribe( resp=>{
            console.log(resp);
            let typeString:string = 'creado';
            if( this.typeForm === TipoAccion.Update )  typeString = 'actualizado';
            this.message = { title : `Pokemon ${typeString} exitosamente!` , code: 200 };
            this.submitted = false;
            this.closeForm();
        },error=>{
            this.message = { title : 'Ocurrió un error inesperado!' , code: 400 };
            this.submitted = false;
            this.closeForm();
        })
  }

  closeForm():void{
    this.pokemonService.eventoFormulario.emit(
        {
            formOpen: false,
            message: this.message
        }
    )
  }

}
