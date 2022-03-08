import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TabelaComponent } from './list/tabela.component';
import { TabelaDetailComponent } from './detail/tabela-detail.component';
import { TabelaUpdateComponent } from './update/tabela-update.component';
import { TabelaDeleteDialogComponent } from './delete/tabela-delete-dialog.component';
import { TabelaRoutingModule } from './route/tabela-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [SharedModule, TabelaRoutingModule, MatSortModule, MatTableModule, MatPaginatorModule, MatTooltipModule, JhMaterialModule],
  declarations: [TabelaComponent, TabelaDetailComponent, TabelaUpdateComponent, TabelaDeleteDialogComponent],
  entryComponents: [TabelaDeleteDialogComponent],
})
export class TabelaModule {}
