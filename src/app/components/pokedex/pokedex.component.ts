import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  loading: boolean = true;
  pokedexData: any;
  constructor(private pokeservice: PokemonService) { 
    this.getPokeData();
  }
  ngOnInit(){
  }

  getPokeData() {
    this.pokeservice.getPokedex()
      .subscribe((data: any) => {
        this.pokedexData = data;
        this.loading = false;
      }, (errorServicio) => {
        console.log(errorServicio);
      });
  }

}
