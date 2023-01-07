import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { eventoForm } from 'src/app/interfaces/pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    subscriptionForm: Subscription;
    isFormOpen:boolean = false;
    showAlert:boolean = false;
    messageAlert:string = '';
    codeMsg:number = 200;
    datosForm:eventoForm;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.subscriptionForm = this.pokemonService.eventoFormulario.subscribe((evt:eventoForm)=>{
        this.isFormOpen = evt.formOpen;
        this.datosForm = evt;
        if( evt.message && evt.message.code ){
            this.getShowAlert(evt.message.title,evt.message.code);
        }
    })
  }

  ngOnDestroy(): void {
    if( this.subscriptionForm ) this.subscriptionForm.unsubscribe();
 }

 closeAlert(event){
    this.showAlert = false;
}

getShowAlert(msg:string, code:number){
    this.codeMsg = code;
    this.showAlert = true;
    this.messageAlert = msg;
  }

}
