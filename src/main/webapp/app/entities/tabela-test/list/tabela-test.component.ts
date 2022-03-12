import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITabelaTest } from '../tabela-test.model';
import { TabelaTestService } from '../service/tabela-test.service';
import { TabelaTestDeleteDialogComponent } from '../delete/tabela-test-delete-dialog.component';

@Component({
  selector: 'jhi-tabela-test',
  templateUrl: './tabela-test.component.html',
})
export class TabelaTestComponent implements OnInit {
  tabelaTests?: ITabelaTest[];
  isLoading = false;

  constructor(protected tabelaTestService: TabelaTestService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.tabelaTestService.query().subscribe({
      next: (res: HttpResponse<ITabelaTest[]>) => {
        this.isLoading = false;
        this.tabelaTests = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ITabelaTest): number {
    return item.id!;
  }

  delete(tabelaTest: ITabelaTest): void {
    const modalRef = this.modalService.open(TabelaTestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tabelaTest = tabelaTest;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
