import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  //baseUrl = "http://pokeapi.salestock.net/api/v2/";
  baseUrl = "https://pokeapi.co/api/v2/";

  constructor(private http: HttpClient) { }

  getApiData(method, n, opt?:string){
    n = n=='' ? n : n+"/";
    opt = opt!=undefined ? opt : '';
    return this.http.get(this.baseUrl + method + "/" + n + opt );
  }

  getPokedex() {
    // console.info("Retrieving Pokedex");
    return this.getApiData('pokedex', '2').pipe( map( data => data['pokemon_entries'] ));
  }

  getPokemon(n) {
    // console.info("Retrieving Pokemon");
    return this.getApiData('pokemon', n);
  }

  getPokemonDesc(n) {
    // console.info("Retrieving Pokemon Description");
    return this.getApiData('pokemon-species', n);
  }

  getAbility(n){
    // console.info("Retrieving Ability");
    return this.getApiData('ability', n);
  }

  getTypes(n){
    // console.info("Retrieving Types");
    return this.getApiData('type', n);
  }
  
  searchTerms(){
    return this.getApiData('pokemon', '', '?limit=151');
  }
}
