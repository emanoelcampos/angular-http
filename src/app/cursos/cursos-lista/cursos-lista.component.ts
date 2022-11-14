import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';



@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];

  bsModalRef?: BsModalRef;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursosService: CursosService,
    private modalService: BsModalService
    ) {}

  ngOnInit(): void {
    // this.cursosService.list().subscribe(
    //   dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError(error => {
        console.log(error);
        //this.error$.next(true);
        this.handleError();
        return EMPTY;
      }),
    );
  }

  /*this.cursoService.list().subscribe({
    next: (v) => {
      this.cursos$ = v;
    },
    error: (e) => {
      catchError(error => {
        this.error$.next(true);
        return EMPTY;
      })
    },
    complete: () => console.log('completo')
  });*/

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.mensagem = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }
}
