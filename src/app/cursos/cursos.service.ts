import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';

import { Curso } from './cursos';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  // create(curso: Curso): Observable<Curso[]>{
  //   return this.http.post(this.API, {cursos:curso})
  // }

  loadByID(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  create(curso: string) {
    return this.http.post(this.API, curso)
      .pipe(take(1));
  }

  update() {

  }

  remove() {

  }
}
