import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITabela, Tabela } from '../tabela.model';
import { TabelaService } from '../service/tabela.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'jhi-tabela-update',
  templateUrl: './tabela-update.component.html',
})
export class TabelaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    region: [null, [Validators.required]],
    promet: [null, [Validators.required]],
  });
  constructor(
    protected tabelaService: TabelaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private dialogRef: MatDialogRef<TabelaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) { id, region, promet }: any
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tabela }) => {
      this.updateForm(tabela);
    });
  }

  public confirmAdd(): void {
    const tabela = this.createFromForm();
    this.subscribeToSaveResponse(this.tabelaService.create(tabela));
    this.dialogRef.close();
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tabela = this.createFromForm();
    if (tabela.id !== undefined) {
      this.subscribeToSaveResponse(this.tabelaService.update(tabela));
    } else {
      this.subscribeToSaveResponse(this.tabelaService.create(tabela));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITabela>>): void {
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

  protected updateForm(tabela: ITabela): void {
    this.editForm.patchValue({
      id: tabela.id,
      region: tabela.region,
      promet: tabela.promet,
    });
  }

  protected createFromForm(): ITabela {
    return {
      ...new Tabela(),
      id: this.editForm.get(['id'])!.value,
      region: this.editForm.get(['region'])!.value,
      promet: this.editForm.get(['promet'])!.value,
    };
  }
}
