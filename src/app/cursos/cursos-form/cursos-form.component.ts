import { Curso } from './../cursos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css'],
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alertModal: AlertModalService,
    //private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    /*this.activatedRoute.params.subscribe((params: any) => {
      const id = params['id'];
      console.log(id);
      const curso$ = this.cursosService.loadByID(id);
      curso$.subscribe((curso) => {
        this.updateForm(curso);
      });
    });*/

    this.activatedRoute.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.cursosService.loadByID(id))
      )
      .subscribe(curso => this.updateForm(curso));

      // concatMap -> ordem da requisição importa
      // mergeMap -> ordem não importa
      // exhaustMap -> casos de login

    this.form = this.formBuilder.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso: any) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  get nome() {
    return this.form.get('nome')!;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.cursosService.create(this.form.value).subscribe({
        next: (success) => {
          this.alertModal.showAlertSuccess('Curso criado com sucesso!');
          //this.location.back();
        },
        error: (error) =>
          this.alertModal.showAlertDanger(
            'Erro ao criar curso, tente novamente.'
          ),
        complete: () => console.info('request complete'),
      });
    }
    this.router.navigate(['cursos']);
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('cancel')
  }
}
