import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service'
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchInput = new FormControl();
  poke;
  foundPoke;
   

  @Output() PokeEmitter: EventEmitter<any>;


  constructor(private router: Router, private pokeService: PokemonService) {
    this.PokeEmitter = new EventEmitter();
    let items = this.searchInput.valueChanges.pipe( debounceTime(2000)).subscribe ( results => {
      router.navigate(['search', results]);
      // console.log("Emitting");
      // this.PokeEmitter.emit(results);
    });
  }

  ngOnInit() {
  }

}
