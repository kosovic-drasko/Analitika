import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrafikon, getGrafikonIdentifier } from '../grafikon.model';

export type EntityResponseType = HttpResponse<IGrafikon>;
export type EntityArrayResponseType = HttpResponse<IGrafikon[]>;

@Injectable({ providedIn: 'root' })
export class GrafikonService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grafikons');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGrafikon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGrafikon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addGrafikonToCollectionIfMissing(grafikonCollection: IGrafikon[], ...grafikonsToCheck: (IGrafikon | null | undefined)[]): IGrafikon[] {
    const grafikons: IGrafikon[] = grafikonsToCheck.filter(isPresent);
    if (grafikons.length > 0) {
      const grafikonCollectionIdentifiers = grafikonCollection.map(grafikonItem => getGrafikonIdentifier(grafikonItem)!);
      const grafikonsToAdd = grafikons.filter(grafikonItem => {
        const grafikonIdentifier = getGrafikonIdentifier(grafikonItem);
        if (grafikonIdentifier == null || grafikonCollectionIdentifiers.includes(grafikonIdentifier)) {
          return false;
        }
        grafikonCollectionIdentifiers.push(grafikonIdentifier);
        return true;
      });
      return [...grafikonsToAdd, ...grafikonCollection];
    }
    return grafikonCollection;
  }
}
