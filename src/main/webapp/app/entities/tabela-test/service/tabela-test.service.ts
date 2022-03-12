import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITabelaTest, getTabelaTestIdentifier } from '../tabela-test.model';

export type EntityResponseType = HttpResponse<ITabelaTest>;
export type EntityArrayResponseType = HttpResponse<ITabelaTest[]>;

@Injectable({ providedIn: 'root' })
export class TabelaTestService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tabela-tests');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tabelaTest: ITabelaTest): Observable<EntityResponseType> {
    return this.http.post<ITabelaTest>(this.resourceUrl, tabelaTest, { observe: 'response' });
  }

  update(tabelaTest: ITabelaTest): Observable<EntityResponseType> {
    return this.http.put<ITabelaTest>(`${this.resourceUrl}/${getTabelaTestIdentifier(tabelaTest) as number}`, tabelaTest, {
      observe: 'response',
    });
  }

  partialUpdate(tabelaTest: ITabelaTest): Observable<EntityResponseType> {
    return this.http.patch<ITabelaTest>(`${this.resourceUrl}/${getTabelaTestIdentifier(tabelaTest) as number}`, tabelaTest, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITabelaTest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITabelaTest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTabelaTestToCollectionIfMissing(
    tabelaTestCollection: ITabelaTest[],
    ...tabelaTestsToCheck: (ITabelaTest | null | undefined)[]
  ): ITabelaTest[] {
    const tabelaTests: ITabelaTest[] = tabelaTestsToCheck.filter(isPresent);
    if (tabelaTests.length > 0) {
      const tabelaTestCollectionIdentifiers = tabelaTestCollection.map(tabelaTestItem => getTabelaTestIdentifier(tabelaTestItem)!);
      const tabelaTestsToAdd = tabelaTests.filter(tabelaTestItem => {
        const tabelaTestIdentifier = getTabelaTestIdentifier(tabelaTestItem);
        if (tabelaTestIdentifier == null || tabelaTestCollectionIdentifiers.includes(tabelaTestIdentifier)) {
          return false;
        }
        tabelaTestCollectionIdentifiers.push(tabelaTestIdentifier);
        return true;
      });
      return [...tabelaTestsToAdd, ...tabelaTestCollection];
    }
    return tabelaTestCollection;
  }
}
