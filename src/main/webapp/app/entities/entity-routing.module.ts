import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'grafikon',
        data: { pageTitle: 'analitikaApp.grafikon.home.title' },
        loadChildren: () => import('./grafikon/grafikon.module').then(m => m.GrafikonModule),
      },
      {
        path: 'tabela',
        data: { pageTitle: 'analitikaApp.tabela.home.title' },
        loadChildren: () => import('./tabela/tabela.module').then(m => m.TabelaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
