import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TabelaTestComponent } from '../list/tabela-test.component';
import { TabelaTestDetailComponent } from '../detail/tabela-test-detail.component';
import { TabelaTestUpdateComponent } from '../update/tabela-test-update.component';
import { TabelaTestRoutingResolveService } from './tabela-test-routing-resolve.service';

const tabelaTestRoute: Routes = [
  {
    path: '',
    component: TabelaTestComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TabelaTestDetailComponent,
    resolve: {
      tabelaTest: TabelaTestRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TabelaTestUpdateComponent,
    resolve: {
      tabelaTest: TabelaTestRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TabelaTestUpdateComponent,
    resolve: {
      tabelaTest: TabelaTestRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tabelaTestRoute)],
  exports: [RouterModule],
})
export class TabelaTestRoutingModule {}
