import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITabelaTest } from '../tabela-test.model';
import { TabelaTestService } from '../service/tabela-test.service';

@Component({
  templateUrl: './tabela-test-delete-dialog.component.html',
})
export class TabelaTestDeleteDialogComponent {
  tabelaTest?: ITabelaTest;

  constructor(protected tabelaTestService: TabelaTestService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tabelaTestService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
