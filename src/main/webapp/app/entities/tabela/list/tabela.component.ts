import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class TabelaComponent implements OnInit, AfterViewInit {
  tabelas?: ITabela[];
  aktivno?: boolean;
  public displayedColumns = ['id', 'region', 'promet', 'delete', 'edit'];
  public dataSource = new MatTableDataSource<ITabela>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected tabelaService: TabelaService, protected modalService: NgbModal, public dialog: MatDialog) {}

  loadAll(): void {
    this.tabelaService.query().subscribe((res: HttpResponse<ITabela[]>) => {
      this.dataSource.data = res.body ?? [];
    });
  }
  startEdit(id?: number, region?: string, promet?: number): any {
    const dialogRef = this.dialog.open(TabelaUpdateComponent, {
      data: {
        id,
        region,
        promet,
      },
    });
    dialogRef.afterClosed().subscribe(() =>
      this.tabelaService.query().subscribe((res: HttpResponse<ITabela[]>) => {
        this.dataSource.data = res.body ?? [];
      })
    );
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
  delete(tabele: ITabela[]): void {
    const modalRef = this.modalService.open(TabelaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postupci = tabele;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
