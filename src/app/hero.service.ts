import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
  private http: HttpClient,
  private messageService: MessageService)
  { }
private log(message: string)  {
  this.messageService.add('HeroService: ' + message);
}
private heroesUrl = 'api/heroes';
  
getHeroes (): Observable<Hero[]>{
  this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    tap(heroes => this.log(`fetched heroes`)),
    catchError(this.handleError('getHeroes'), [ ]))
  );
}
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}
/* PUT : update the hero on the server */
updateHero(hero:Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${id}`)),
    catchError(this.handleError<any>(`updateHero`))
  );
}
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Hero>(`addHero`))
  );
}
deleteHero(hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>(`delete hero`))
  );
}
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()){
    return of([]);
  }
  return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', [ ]))
  );
}
}
