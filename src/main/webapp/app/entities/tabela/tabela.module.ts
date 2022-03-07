import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TabelaComponent } from './list/tabela.component';
import { TabelaDetailComponent } from './detail/tabela-detail.component';
import { TabelaUpdateComponent } from './update/tabela-update.component';
import { TabelaDeleteDialogComponent } from './delete/tabela-delete-dialog.component';
import { TabelaRoutingModule } from './route/tabela-routing.module';

@NgModule({
  imports: [SharedModule, TabelaRoutingModule],
  declarations: [TabelaComponent, TabelaDetailComponent, TabelaUpdateComponent, TabelaDeleteDialogComponent],
  entryComponents: [TabelaDeleteDialogComponent],
})
export class TabelaModule {}
