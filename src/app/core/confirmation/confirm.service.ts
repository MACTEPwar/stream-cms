import { Injectable } from '@angular/core';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ConfirmService {
  constructor(private confirmationService: ConfirmationService) {}

  confirm$(confirmation: Confirmation): Observable<any> {
    const subj = new Subject<any>();
    confirmation.accept = () => {
      subj.next(true);
    };
    confirmation.reject = () => {
      subj.next(false);
    };
    this.confirmationService.confirm(confirmation);
    return subj;
  }
}
