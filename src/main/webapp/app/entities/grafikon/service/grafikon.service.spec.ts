import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGrafikon } from '../grafikon.model';

import { GrafikonService } from './grafikon.service';

describe('Grafikon Service', () => {
  let service: GrafikonService;
  let httpMock: HttpTestingController;
  let elemDefault: IGrafikon;
  let expectedResult: IGrafikon | IGrafikon[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GrafikonService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      region: 'AAAAAAA',
      promet: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of Grafikon', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          region: 'BBBBBB',
          promet: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addGrafikonToCollectionIfMissing', () => {
      it('should add a Grafikon to an empty array', () => {
        const grafikon: IGrafikon = { id: 123 };
        expectedResult = service.addGrafikonToCollectionIfMissing([], grafikon);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grafikon);
      });

      it('should not add a Grafikon to an array that contains it', () => {
        const grafikon: IGrafikon = { id: 123 };
        const grafikonCollection: IGrafikon[] = [
          {
            ...grafikon,
          },
          { id: 456 },
        ];
        expectedResult = service.addGrafikonToCollectionIfMissing(grafikonCollection, grafikon);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Grafikon to an array that doesn't contain it", () => {
        const grafikon: IGrafikon = { id: 123 };
        const grafikonCollection: IGrafikon[] = [{ id: 456 }];
        expectedResult = service.addGrafikonToCollectionIfMissing(grafikonCollection, grafikon);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grafikon);
      });

      it('should add only unique Grafikon to an array', () => {
        const grafikonArray: IGrafikon[] = [{ id: 123 }, { id: 456 }, { id: 79206 }];
        const grafikonCollection: IGrafikon[] = [{ id: 123 }];
        expectedResult = service.addGrafikonToCollectionIfMissing(grafikonCollection, ...grafikonArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const grafikon: IGrafikon = { id: 123 };
        const grafikon2: IGrafikon = { id: 456 };
        expectedResult = service.addGrafikonToCollectionIfMissing([], grafikon, grafikon2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(grafikon);
        expect(expectedResult).toContain(grafikon2);
      });

      it('should accept null and undefined values', () => {
        const grafikon: IGrafikon = { id: 123 };
        expectedResult = service.addGrafikonToCollectionIfMissing([], null, grafikon, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(grafikon);
      });

      it('should return initial array if no Grafikon is added', () => {
        const grafikonCollection: IGrafikon[] = [{ id: 123 }];
        expectedResult = service.addGrafikonToCollectionIfMissing(grafikonCollection, undefined, null);
        expect(expectedResult).toEqual(grafikonCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
