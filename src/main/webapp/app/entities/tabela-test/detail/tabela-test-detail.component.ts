import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITabelaTest } from '../tabela-test.model';

@Component({
  selector: 'jhi-tabela-test-detail',
  templateUrl: './tabela-test-detail.component.html',
})
export class TabelaTestDetailComponent implements OnInit {
  tabelaTest: ITabelaTest | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tabelaTest }) => {
      this.tabelaTest = tabelaTest;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
