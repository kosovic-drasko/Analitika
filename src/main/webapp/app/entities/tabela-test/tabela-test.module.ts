import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TabelaTestComponent } from './list/tabela-test.component';
import { TabelaTestDetailComponent } from './detail/tabela-test-detail.component';
import { TabelaTestUpdateComponent } from './update/tabela-test-update.component';
import { TabelaTestDeleteDialogComponent } from './delete/tabela-test-delete-dialog.component';
import { TabelaTestRoutingModule } from './route/tabela-test-routing.module';

@NgModule({
  imports: [SharedModule, TabelaTestRoutingModule],
  declarations: [TabelaTestComponent, TabelaTestDetailComponent, TabelaTestUpdateComponent, TabelaTestDeleteDialogComponent],
  entryComponents: [TabelaTestDeleteDialogComponent],
})
export class TabelaTestModule {}
