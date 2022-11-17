import { Injectable } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

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

  showConfirm(title:string, msg:string, okTxt?:string, cancelTxt?:string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
