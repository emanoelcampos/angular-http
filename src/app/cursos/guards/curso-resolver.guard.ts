import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable,of } from 'rxjs';

import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root'
})
export class CursoResolverGuard implements Resolve<Curso> {

  constructor(private cursosService: CursosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    if (route.params && route.params['id']) {
      return this.cursosService.loadByID(route.params['id']);
    }

     return of({
      id: null,
      nome: null
    });
  }

}
