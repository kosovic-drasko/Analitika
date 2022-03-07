import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITabela, Tabela } from '../tabela.model';
import { TabelaService } from '../service/tabela.service';

@Injectable({ providedIn: 'root' })
export class TabelaRoutingResolveService implements Resolve<ITabela> {
  constructor(protected service: TabelaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITabela> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tabela: HttpResponse<Tabela>) => {
          if (tabela.body) {
            return of(tabela.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tabela());
  }
}
