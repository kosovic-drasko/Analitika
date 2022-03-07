import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TabelaComponent } from '../list/tabela.component';
import { TabelaDetailComponent } from '../detail/tabela-detail.component';
import { TabelaUpdateComponent } from '../update/tabela-update.component';
import { TabelaRoutingResolveService } from './tabela-routing-resolve.service';

const tabelaRoute: Routes = [
  {
    path: '',
    component: TabelaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TabelaDetailComponent,
    resolve: {
      tabela: TabelaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TabelaUpdateComponent,
    resolve: {
      tabela: TabelaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TabelaUpdateComponent,
    resolve: {
      tabela: TabelaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tabelaRoute)],
  exports: [RouterModule],
})
export class TabelaRoutingModule {}
