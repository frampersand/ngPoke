import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { forkJoin } from "rxjs";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  pokemonData: any = {};
  abilityData: any = [];
  loading = true;
  imgType: string;
  shiny: boolean;
  pokeImage: string;
  pokeImageBack: string;
  next: any;
  back: any;

  constructor(private activatedRoute: ActivatedRoute, private pokeservice: PokemonService, private router: Router) {
    this.fetchPokeData(this.activatedRoute.snapshot.params['number']);
  }

  fetchPokeData(number){
    if(number <= 0 || number > 151)
      this.router.navigate( ['pokedex'], number);
    else{
      this.loading = true;
      let poke = this.pokeservice.getPokemon(number);
      let pokeDesc = this.pokeservice.getPokemonDesc(number);

      forkJoin([poke, pokeDesc]).subscribe(results => {
        this.pokemonData.data = results[0];
        this.pokemonData.desc = results[1];
        this.pokemonData.desc.flavor_text = this.findEnglishText(this.pokemonData.desc.flavor_text_entries);
        this.pokemonData.desc.genus = this.findEnglishText(this.pokemonData.desc.genera);
        this.shiny = false;
        this.imgViewType('animated');
        
        let abilities = [];
        for (let ability of this.pokemonData.data.abilities) {
          let url = ability.ability.url.split('/');
          abilities.push( this.pokeservice.getAbility(url[url.length-2]) )
        }
        forkJoin(abilities).subscribe(results => {
          this.abilityData = results;
          this.loading = false;
        });

        if(number < 151)
          this.next = this.pokemonData.desc.id + 1;
        else
          this.next = false;
        if(number >= 1)      
          this.back = this.pokemonData.desc.id - 1;
        else
          this.back = false;
      });
    }
  }

  imgViewType(type){
    this.imgType = type;
    if(this.imgType == 'normal' && !this.shiny){
      this.pokeImage = this.pokemonData.data.sprites.front_default;
      this.pokeImageBack = this.pokemonData.data.sprites.back_default;
    }
    if(this.imgType == 'animated' && !this.shiny){
      this.pokeImage = `https://img.pokemondb.net/sprites/black-white/anim/normal/${this.pokemonData.data.name}.gif`;
      this.pokeImageBack = `https://img.pokemondb.net/sprites/black-white/anim/back-normal/${this.pokemonData.data.name}.gif`;
    }
    if(this.imgType == 'normal' && this.shiny){
      this.pokeImage = this.pokemonData.data.sprites.front_shiny;
      this.pokeImageBack = this.pokemonData.data.sprites.back_shiny;
    }
    if(this.imgType == 'animated' && this.shiny){
      this.pokeImage = `https://img.pokemondb.net/sprites/black-white/anim/shiny/${this.pokemonData.data.name}.gif`;
      this.pokeImageBack = `https://img.pokemondb.net/sprites/black-white/anim/back-shiny/${this.pokemonData.data.name}.gif`;
    }
  }
  
  shinyToggle(type){
    this.shiny = !this.shiny;
    this.imgViewType(type);
  }

  findEnglishText(object){
    return object.find(t => t.language.name == 'en');
  }
}
