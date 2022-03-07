import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITabela } from '../tabela.model';

@Component({
  selector: 'jhi-tabela-detail',
  templateUrl: './tabela-detail.component.html',
})
export class TabelaDetailComponent implements OnInit {
  tabela: ITabela | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tabela }) => {
      this.tabela = tabela;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
