import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITabela } from '../tabela.model';
import { TabelaService } from '../service/tabela.service';

@Component({
  templateUrl: './tabela-delete-dialog.component.html',
})
export class TabelaDeleteDialogComponent {
  tabela?: ITabela;

  constructor(protected tabelaService: TabelaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tabelaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
