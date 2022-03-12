import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITabelaTest, TabelaTest } from '../tabela-test.model';
import { TabelaTestService } from '../service/tabela-test.service';

@Component({
  selector: 'jhi-tabela-test-update',
  templateUrl: './tabela-test-update.component.html',
})
export class TabelaTestUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    broj: [],
    ime: [],
  });

  constructor(protected tabelaTestService: TabelaTestService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tabelaTest }) => {
      this.updateForm(tabelaTest);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tabelaTest = this.createFromForm();
    if (tabelaTest.id !== undefined) {
      this.subscribeToSaveResponse(this.tabelaTestService.update(tabelaTest));
    } else {
      this.subscribeToSaveResponse(this.tabelaTestService.create(tabelaTest));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITabelaTest>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(tabelaTest: ITabelaTest): void {
    this.editForm.patchValue({
      id: tabelaTest.id,
      broj: tabelaTest.broj,
      ime: tabelaTest.ime,
    });
  }

  protected createFromForm(): ITabelaTest {
    return {
      ...new TabelaTest(),
      id: this.editForm.get(['id'])!.value,
      broj: this.editForm.get(['broj'])!.value,
      ime: this.editForm.get(['ime'])!.value,
    };
  }
}
