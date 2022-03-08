import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITabela } from '../tabela.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { TabelaService } from '../service/tabela.service';
import { TabelaDeleteDialogComponent } from '../delete/tabela-delete-dialog.component';
import { TabelaUpdateComponent } from '../update/tabela-update.component';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-tabela',
  templateUrl: './tabela.component.html',
})
export class TabelaComponent implements OnInit {
  tabelas?: ITabela[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  public displayedColumns = [
    'id',
    'region',
    'promet',
    'edit',
    // 'delete selected',
    // 'select',
  ];

  public dataSource = new MatTableDataSource<ITabela>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    protected tabelaService: TabelaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  startEdit(id?: number, region?: VTTRegion, promet?: number): any {
    const dialogRef = this.dialog.open(TabelaUpdateComponent, {
      data: {
        id,
        region,
        promet,
      },
    });

    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      () =>
        this.tabelaService.query().subscribe((res: HttpResponse<ITabela[]>) => {
          this.dataSource.data = res.body ?? [];
          // this.ponude = res;
        })
    );
  }

  loadAll(): void {
    this.tabelaService.query().subscribe((res: HttpResponse<ITabela[]>) => {
      this.dataSource.data = res.body ?? [];
    });
  }
  delete(tabela: ITabela): void {
    const modalRef = this.modalService.open(TabelaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tabela = tabela;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        // this.loadPage();
      }
    });
  }
  addNew(): any {
    const dialogRef = this.dialog.open(TabelaUpdateComponent, {
      data: { Postupci: {} },
    });
    dialogRef.afterClosed().subscribe(() =>
      this.tabelaService.query().subscribe((res: HttpResponse<ITabela[]>) => {
        this.dataSource.data = res.body ?? [];
      })
    );
  }
  // protected sort(): string[] {
  //   const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
  //   if (this.predicate !== 'id') {
  //     result.push('id');
  //   }
  //   return result;
  // }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        // this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: ITabela[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/tabela'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.tabelas = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
