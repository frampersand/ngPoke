import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component'
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  poke: any;
  types: any;
  
  pokeList: any = {};
  loading: boolean = true;
  query: string;
  gotResults: boolean;
  foundType: any;


  kantoPokesByType: any;
  
  foundByType:any = {}
  foundByName: any;

  typeList: any = [
    {
    "name": "normal",
    "id": "1"
    },
    {
    "name": "fighting",
    "id": "2"
    },
    {
    "name": "flying",
    "id": "3"
    },
    {
    "name": "poison",
    "id": "4"
    },
    {
    "name": "ground",
    "id": "5"
    },
    {
    "name": "rock",
    "id": "6"
    },
    {
    "name": "bug",
    "id": "7"
    },
    {
    "name": "ghost",
    "id": "8"
    },
    {
    "name": "steel",
    "id": "9"
    },
    {
    "name": "fire",
    "id": "10"
    },
    {
    "name": "water",
    "id": "11"
    },
    {
    "name": "grass",
    "id": "12"
    },
    {
    "name": "electric",
    "id": "13"
    },
    {
    "name": "psychic",
    "id": "14"
    },
    {
    "name": "ice",
    "id": "15"
    },
    {
    "name": "dragon",
    "id": "16"
    },
    // {
    // "name": "dark",
    // "id": "17"
    // },
    {
    "name": "fairy",
    "id": "18"
    }
    // {
    // "name": "shadow",
    // "id": "10002"
    // }
  ]
  
  constructor(private activatedRoute: ActivatedRoute, private pokeService: PokemonService) { 
    //this.searchPoke(this.activatedRoute.snapshot.params['query']);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.query = this.activatedRoute.snapshot.params['query'];
        this.loading = true;
        this.searchPoke(this.activatedRoute.snapshot.params['query']);
    });
}

  searchPoke(n){
    this.foundByType = this.typeList.filter( p => p.name.includes(n.toLowerCase()));
    // IF THE QUERY IS NOT ON THE TYPE LIST
    if (this.foundByType.length == 0){
      this.pokeService.searchTerms().subscribe ( data => {
        this.poke = data;
        this.foundByName = this.poke.results.filter(p => p.name.includes(n.toLowerCase()));
        // IF THE QUERY DOES NOT MATCH A POKEMON
        if(this.foundByName.length == 0 ){
          this.gotResults = false;
          this.loading = false;
        }
        else {
          this.searchByPokemon(this.foundByName);         
        }
      });
    }else{
      this.searchByType(this.foundByType[0]);
    }
  }

  searchByPokemon(pokeArray){
    let list = [];
    for (let poke of pokeArray) {
      let number = this.getLastParam(poke.url);
      list.push( this.pokeService.getPokemon(number) )
    }
    forkJoin(list).subscribe(results => {
      this.pokeList = results;
      this.gotResults = true;
      this.loading = false; 
    });
  }

  searchByType(type){
    this.pokeService.getTypes(type.id).subscribe(results => {
      this.kantoPokesByType = results;
      let kantoTypes = this.kantoPokesByType.pokemon.filter(p => this.getLastParam(p.pokemon.url) < 151);
      let list = [];
      for (let poke of kantoTypes) {
        let number = this.getLastParam(poke.pokemon.url);
        list.push( this.pokeService.getPokemon(number) )
      }
      forkJoin(list).subscribe(results => {
        this.pokeList = results;
        this.gotResults = true;
        this.loading = false; 
      });
    });
  }

  getLastParam(n){
    let urlArray = n.split('/');
    return urlArray[urlArray.length - 2];
  }
}
