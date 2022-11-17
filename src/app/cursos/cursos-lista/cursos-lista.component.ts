import { AlertModalService } from './../../shared/alert-modal.service';
import { catchError, EMPTY, Observable, Subject, take, switchMap } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Curso } from '../cursos';
import { Cursos2Service } from '../cursos2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {
  //cursos!: Curso[];

  //bsModalRef?: BsModalRef;

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursoSelecionado!: Curso;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private cursosService: Cursos2Service,
    //private modalService: BsModalService
    private alertModalService: AlertModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // this.cursosService.list().subscribe(
    //   dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((error) => {
        console.log(error);
        //this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
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
    this.alertModalService.showAlertDanger(
      'Erro ao carregar cursos. Tente novamente mais tarde.'
    );
    /*this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.mensagem = 'Erro ao carregar cursos. Tente novamente mais tarde.';*/
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.activatedRoute });
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover o curso?');
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.cursosService.remove(curso.id) : EMPTY)
    ).subscribe(
      {
        next: (success) => {
          this.alertModalService.showAlertSuccess('Curso removido com sucesso.');
          this.onRefresh();
        },
        error: (error) => {
          this.alertModalService.showAlertDanger(
            'Erro ao remover curso. Tente novamente mais tarde.'
          );
        },
        complete: () => console.info('remove complete'),
      }
    );
  }

  onConfirmDelete() {
    this.cursosService.remove(this.cursoSelecionado.id).subscribe({
      next: (success) => {
        this.alertModalService.showAlertSuccess('Curso removido com sucesso.');
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
      error: (error) => {
        this.alertModalService.showAlertDanger(
          'Erro ao remover curso. Tente novamente mais tarde.'
        );
        this.deleteModalRef?.hide();
      },
      complete: () => console.info('remove complete'),
    });
  }

  OnDeclineDelete() {
    this.deleteModalRef?.hide();
  }
}
