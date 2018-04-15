import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(
  private http: HttpClient,
  private messageService: MessageService)
  { }
private log(message: string)  {
  this.messageService.add('HeroService: ' + message);
}
private heroesUrl = 'api/heroes';
  
getHeroes(): Observable<Hero[]>{
  this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    tap(heroes => this.log(`fetched heroes`)),
    catchError(this.handleError('getHeroes'), [ ]))
  );
}
getHero(id: number): Observable<Hero> {
  this.messageService.add(`HeroService: fetched hero id=${id}`);
  return of(HEROES.find(hero => hero.id === id));
}
}
