import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PokemonMockService } from 'src/app/mocks/pokemon-mock.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListadoComponent } from './listado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

function eventInput(element: HTMLInputElement, value: any): void {
    const event = new Event('input', { bubbles: true });
    element.value = value;
    element.dispatchEvent(event);
  }

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
      }
    },
  };

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
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
    fixture.detectChanges();
  });

  it('Validar existencias de los elementos por el ID', () => {

    const inputSearch = SELECTORS.POKEMON.LIST.inputSearch();
    const table = SELECTORS.POKEMON.LIST.table();
    const btnAdd = SELECTORS.POKEMON.LIST.btnAdd();

    fixture.detectChanges();

    expect(inputSearch.tagName).toEqual('INPUT');
    expect(table.tagName).toEqual('TABLE');
    expect(btnAdd.tagName).toEqual('BUTTON');    
  });


  it('Obtiene la lista de pokemones al inicializar el componente', fakeAsync(async () => {

    let imagen: HTMLImageElement;
    let nombre: HTMLElement;
    let ataque: HTMLElement;
    let defensa: HTMLElement;
    let btnDelete: HTMLButtonElement;
    const index = 0;
    const datos = await new PokemonMockService().getPokemonsByAuthor();
    component.ngOnInit();
    component.pokemons = datos;
    tick(1000);

    

    fixture.detectChanges();
    nombre = SELECTORS.POKEMON.LIST.tableItemName(index);
    imagen = SELECTORS.POKEMON.LIST.tableItemImage(index);
    ataque = SELECTORS.POKEMON.LIST.tableItemAtack(index);
    defensa = SELECTORS.POKEMON.LIST.tableItemDefense(index);
    btnDelete = SELECTORS.POKEMON.LIST.tableItemBtnDelete(index);

    expect(imagen.tagName).toEqual('IMG');
    expect(btnDelete.tagName).toEqual('BUTTON');
    expect(nombre.textContent).toEqual(datos[index].name);
    expect(ataque.textContent).toEqual(datos[index].attack.toString());
    expect(defensa.textContent).toEqual(datos[index].defense.toString());


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

  it('El formulario debe estar visible al dar click en boton +Nuevo', fakeAsync(() => {

    const btnAdd = SELECTORS.POKEMON.LIST.btnAdd();
    btnAdd.click();
    fixture.detectChanges();
    tick(1000);
    const form = SELECTORS.POKEMON.FORM.form();

    fixture.detectChanges();

    expect(form.tagName).toEqual('FORM')
  }));

  it('El formulario debe estar visible al dar click en boton Editar', fakeAsync(async() => {

    const datos = await new PokemonMockService().getPokemonsByAuthor();
    component.ngOnInit();
    component.pokemons = datos;
    tick(1000);
    fixture.detectChanges();
    const btnEdit = SELECTORS.POKEMON.LIST.tableItemBtnEdit(1);
    btnEdit.click();
    fixture.detectChanges();
    tick(1000);
    const form = SELECTORS.POKEMON.FORM.form();

    fixture.detectChanges();

    expect(form.tagName).toEqual('FORM')
  }));





});



