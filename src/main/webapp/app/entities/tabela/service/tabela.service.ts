import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITabela, getTabelaIdentifier } from '../tabela.model';

export type EntityResponseType = HttpResponse<ITabela>;
export type EntityArrayResponseType = HttpResponse<ITabela[]>;

@Injectable({ providedIn: 'root' })
export class TabelaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tabelas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tabela: ITabela): Observable<EntityResponseType> {
    return this.http.post<ITabela>(this.resourceUrl, tabela, { observe: 'response' });
  }

  update(tabela: ITabela): Observable<EntityResponseType> {
    return this.http.put<ITabela>(`${this.resourceUrl}/${getTabelaIdentifier(tabela) as number}`, tabela, { observe: 'response' });
  }

  partialUpdate(tabela: ITabela): Observable<EntityResponseType> {
    return this.http.patch<ITabela>(`${this.resourceUrl}/${getTabelaIdentifier(tabela) as number}`, tabela, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITabela>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITabela[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTabelaToCollectionIfMissing(tabelaCollection: ITabela[], ...tabelasToCheck: (ITabela | null | undefined)[]): ITabela[] {
    const tabelas: ITabela[] = tabelasToCheck.filter(isPresent);
    if (tabelas.length > 0) {
      const tabelaCollectionIdentifiers = tabelaCollection.map(tabelaItem => getTabelaIdentifier(tabelaItem)!);
      const tabelasToAdd = tabelas.filter(tabelaItem => {
        const tabelaIdentifier = getTabelaIdentifier(tabelaItem);
        if (tabelaIdentifier == null || tabelaCollectionIdentifiers.includes(tabelaIdentifier)) {
          return false;
        }
        tabelaCollectionIdentifiers.push(tabelaIdentifier);
        return true;
      });
      return [...tabelasToAdd, ...tabelaCollection];
    }
    return tabelaCollection;
  }
}
