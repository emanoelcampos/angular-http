import { Injectable } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {


  constructor(private modalService: BsModalService) { }

  private showAlert(mensagem: string, type: AlertTypes, dissmissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.mensagem = mensagem;

    if(dissmissTimeout) {
      setTimeout(() => bsModalRef.hide(), dissmissTimeout);
    }
  }

  showAlertDanger(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.DANGER);
  }

  showAlertSuccess(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.SUCCESS, 3000);
  }
}
