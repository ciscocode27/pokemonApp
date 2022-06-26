import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FilterPokemonsPipe } from './filter-pokemons.pipe';



@NgModule({
  declarations: [AlertComponent,FilterPokemonsPipe],
  imports: [
    CommonModule
  ],
  exports:[
    AlertComponent,
    FilterPokemonsPipe
  ]
})
export class SharedModule { }
