import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { eventoForm, ResponsePokemon, TipoAccion } from 'src/app/interfaces/pokemons';
import { EventEmitter, Injectable } from '@angular/core';

import { FormularioComponent } from './formulario.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

const pokemonServiceStub = {
    createUpdatePokemon:()=> of([]),
    eventoFormulario : new EventEmitter()
  };

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let pokemonService: PokemonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers:[
        { provide: PokemonService, useValue: pokemonServiceStub }
    ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.get(PokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('crea correctamente un pokemon', () => {
    component.formAction.setValue({
        name: 'Pikachu',
        image : 'https://img.pokemondb.net/artwork/pikachu.jpg',
        attack : 60,
        defense : 60
    });
    fixture.detectChanges();
    component.savePokemon();
    expect(component.message).toEqual({ title : `Pokemon creado exitosamente!` , code: 200 });
  });

  it('actualiza correctamente un pokemon', () => {
    component.formAction.setValue({
        name: 'Pikachu',
        image : 'https://img.pokemondb.net/artwork/pikachu.jpg',
        attack : 60,
        defense : 60
    });
    fixture.detectChanges();
    component.typeForm = TipoAccion.Update;
    component.pokemonUpdate = {
        "id":372,
        "name":"Alakazam",
        "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
        "attack":100,
        "defense":64,
        "hp":100,
        "type":"psychic",
        "id_author":1
     };
    component.savePokemon();
    expect(component.message).toEqual({ title : `Pokemon actualizado exitosamente!` , code: 200 });
  });

  
  it('Los campos están vacíos y deben aparecer el mensaje de error', () => {

    let inputNameError: HTMLDivElement;
    let inputImagenError: HTMLDivElement;
    let btn: HTMLButtonElement;

    component.savePokemon();
    fixture.detectChanges();
    inputNameError = document.querySelector('#pokemon-form__name-error');
    inputImagenError = document.querySelector('#pokemon-form__image-error');
    btn = document.querySelector('#pokemon-form__btn-save');

    expect(inputNameError.textContent).toContain('El nombre es requerido');
    expect(inputImagenError.textContent).toContain('La imagen es requerida');


  });



});
