import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
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
          this.location.back();
        },
        error: (error) => this.alertModal.showAlertDanger('Erro ao criar curso, tente novamente.'),
        complete: () => console.info('request complete'),
      });
    }
    //this.onCancel();
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //console.log('cancel')
  }

}
