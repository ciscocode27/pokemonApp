import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ListadoComponent } from './listado/listado.component';
import { FilterPokemonsPipe } from './listado/filter-pokemons.pipe';



@NgModule({
  declarations: [
    HomeComponent, 
    NavbarComponent, 
    ListadoComponent,
    FilterPokemonsPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
