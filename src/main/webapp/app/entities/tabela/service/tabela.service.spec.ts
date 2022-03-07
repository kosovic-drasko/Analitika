import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITabela, Tabela } from '../tabela.model';

import { TabelaService } from './tabela.service';

describe('Tabela Service', () => {
  let service: TabelaService;
  let httpMock: HttpTestingController;
  let elemDefault: ITabela;
  let expectedResult: ITabela | ITabela[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TabelaService);
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

    it('should create a Tabela', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Tabela()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Tabela', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          region: 'BBBBBB',
          promet: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Tabela', () => {
      const patchObject = Object.assign(
        {
          region: 'BBBBBB',
        },
        new Tabela()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Tabela', () => {
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

    it('should delete a Tabela', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTabelaToCollectionIfMissing', () => {
      it('should add a Tabela to an empty array', () => {
        const tabela: ITabela = { id: 123 };
        expectedResult = service.addTabelaToCollectionIfMissing([], tabela);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tabela);
      });

      it('should not add a Tabela to an array that contains it', () => {
        const tabela: ITabela = { id: 123 };
        const tabelaCollection: ITabela[] = [
          {
            ...tabela,
          },
          { id: 456 },
        ];
        expectedResult = service.addTabelaToCollectionIfMissing(tabelaCollection, tabela);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Tabela to an array that doesn't contain it", () => {
        const tabela: ITabela = { id: 123 };
        const tabelaCollection: ITabela[] = [{ id: 456 }];
        expectedResult = service.addTabelaToCollectionIfMissing(tabelaCollection, tabela);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tabela);
      });

      it('should add only unique Tabela to an array', () => {
        const tabelaArray: ITabela[] = [{ id: 123 }, { id: 456 }, { id: 33898 }];
        const tabelaCollection: ITabela[] = [{ id: 123 }];
        expectedResult = service.addTabelaToCollectionIfMissing(tabelaCollection, ...tabelaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tabela: ITabela = { id: 123 };
        const tabela2: ITabela = { id: 456 };
        expectedResult = service.addTabelaToCollectionIfMissing([], tabela, tabela2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tabela);
        expect(expectedResult).toContain(tabela2);
      });

      it('should accept null and undefined values', () => {
        const tabela: ITabela = { id: 123 };
        expectedResult = service.addTabelaToCollectionIfMissing([], null, tabela, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tabela);
      });

      it('should return initial array if no Tabela is added', () => {
        const tabelaCollection: ITabela[] = [{ id: 123 }];
        expectedResult = service.addTabelaToCollectionIfMissing(tabelaCollection, undefined, null);
        expect(expectedResult).toEqual(tabelaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
