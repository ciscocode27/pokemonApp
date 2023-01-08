import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PokemonMockService } from 'src/app/mocks/pokemon-mock.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListadoComponent } from './listado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';
import { of } from 'rxjs';

function eventInput(element: HTMLInputElement, value: any): void {
    const event = new Event('input', { bubbles: true });
    element.value = value;
    element.dispatchEvent(event);
  }


  const pokemonServiceStub = {
    getPokemonsByAuthor:()=> of([
        {
           "id":372,
           "name":"Alakazam",
           "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
           "attack":100,
           "defense":64,
           "hp":100,
           "type":"psychic",
           "id_author":1
        },
        {
           "id":426,
           "name":"Mewtwo",
           "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/150_f3.png",
           "attack":100,
           "defense":100,
           "hp":100,
           "type":"Legendario",
           "id_author":1
        },
        {
           "id":473,
           "name":"Blastoise",
           "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/full//009.png",
           "attack":44,
           "defense":36,
           "hp":22,
           "type":"Agua",
           "id_author":1
        }
     ])
  };

const SELECTORS = {
    POKEMON: {
      LIST: {
        inputSearch: (): HTMLInputElement => document.querySelector('#pokemon-list__filter'),
        btnAdd: (): HTMLButtonElement => document.querySelector('#pokemon-btn-add'),
        table: (): HTMLTableElement => document.querySelector('#pokemon-list__table'),
        tableItem: (index: number): HTMLElement => document.querySelector(`#pokemon-list__table-item-${index}`),
        tableItemName: (index: number): HTMLElement => document.querySelector(`#pokemon-list__table-item-${index}-name`),
        tableItemImage: (index: number): HTMLImageElement => document.querySelector(`#pokemon-list__table-item-${index}-image`),
        tableItemAtack: (index: number): HTMLElement => document.querySelector(`#pokemon-list__table-item-${index}-atack`),
        tableItemDefense: (index: number): HTMLElement => document.querySelector(`#pokemon-list__table-item-${index}-defense`),
        tableItemBtnDelete: (index: number): HTMLButtonElement => document.querySelector(`#pokemon-list__table-item-${index}-btn-delete`),
        tableItemBtnEdit: (index: number): HTMLButtonElement => document.querySelector(`#pokemon-list__table-item-${index}-btn-edit`)
      },
      FORM:{
        form: (): HTMLFormElement => document.querySelector('#pokemon-form'),
        inputName: (): HTMLInputElement => document.querySelector('#pokemon-form__name'),
        inputNameError: (): HTMLDivElement => document.querySelector('#pokemon-form__name-error'),
        inputImagen: (): HTMLInputElement => document.querySelector('#pokemon-form__image'),
        inputImagenError: (): HTMLDivElement => document.querySelector('#pokemon-form__image-error'),
        btnSave: (): HTMLButtonElement => document.querySelector('#pokemon-form__btn-save'),
      }
    },
  };

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;
  let pokemonService: PokemonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers:[
        { provide: PokemonService, useValue: pokemonServiceStub }
    ],
      schemas: [
        NO_ERRORS_SCHEMA
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;

    pokemonService = TestBed.get(PokemonService);

    fixture.detectChanges();
  });



  it('Obtiene la lista de pokemones al inicializar el componente', fakeAsync(async () => {
    component.ngOnInit();
    component.getAllPokemons();
    expect(component.pokemons.length).toBeGreaterThan(0);
  }));

  it('Filtra los pokemons por el nombre (filtra correctamente)', fakeAsync(async() => {

    let table: HTMLTableElement;
    const name = 'Mewtwo';

    const datos = await new PokemonMockService().getPokemonsByAuthor();
    component.ngOnInit();
    component.pokemons = datos;
    eventInput(SELECTORS.POKEMON.LIST.inputSearch(), name);
    tick(1000);
    fixture.detectChanges();
    table = SELECTORS.POKEMON.LIST.table();

    expect(table.querySelector('tbody').childElementCount).toEqual(1);
  }));

  it('Filtra los pokemons por el nombre (no debe encontrar coincidencias)', fakeAsync(async() => {

    let table: HTMLTableElement;
    const name = 'Pikachu';

    const datos = await new PokemonMockService().getPokemonsByAuthor();
    component.ngOnInit();
    component.pokemons = datos;
    eventInput(SELECTORS.POKEMON.LIST.inputSearch(), name);
    tick(1000);
    fixture.detectChanges();
    table = SELECTORS.POKEMON.LIST.table();

    expect(table.querySelector('tbody').childElementCount).toEqual(0);
  }));


  it('Dene comenzar con el formulario oculto', () => {

    const form = SELECTORS.POKEMON.FORM.form();

    fixture.detectChanges();

    expect(form).toBeNull()
  });

 /*  



  it('Los campos están llenos y habilitar el boton de guardar pokemon', fakeAsync(() => {

    const name = 'Pikachu';
    const image = 'https://img.pokemondb.net/artwork/pikachu.jpg';
    let inputNameError: HTMLDivElement;
    let inputImagenError: HTMLDivElement;
    let btn: HTMLButtonElement;

    component.ngOnInit();
    component.activeForm = true;
    fixture.detectChanges();
    eventInput(SELECTORS.POKEMON.FORM.inputName(), name);
    eventInput(SELECTORS.POKEMON.FORM.inputImagen(), image);
    fixture.detectChanges();
    inputNameError = SELECTORS.POKEMON.FORM.inputNameError();
    inputImagenError = SELECTORS.POKEMON.FORM.inputImagenError();
    btn = SELECTORS.POKEMON.FORM.btnSave();
    btn.click();
    tick(1000);

    expect(btn.disabled).toEqual(false);
    expect(inputNameError).toBeNull();
    expect(inputImagenError).toBeNull();


  }));
 */




});



