import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: 'search/:query' , component: SearchComponent },
  { path: 'pokemon/:number', component: PokemonComponent },
  { path: '', pathMatch: 'full', redirectTo: 'pokedex' },
  { path: '**', pathMatch: 'full', redirectTo: 'pokedex' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
