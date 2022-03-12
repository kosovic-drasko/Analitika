import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITabelaTest, TabelaTest } from '../tabela-test.model';
import { TabelaTestService } from '../service/tabela-test.service';

@Injectable({ providedIn: 'root' })
export class TabelaTestRoutingResolveService implements Resolve<ITabelaTest> {
  constructor(protected service: TabelaTestService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITabelaTest> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tabelaTest: HttpResponse<TabelaTest>) => {
          if (tabelaTest.body) {
            return of(tabelaTest.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TabelaTest());
  }
}
