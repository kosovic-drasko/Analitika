import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITabelaTest, TabelaTest } from '../tabela-test.model';

import { TabelaTestService } from './tabela-test.service';

describe('TabelaTest Service', () => {
  let service: TabelaTestService;
  let httpMock: HttpTestingController;
  let elemDefault: ITabelaTest;
  let expectedResult: ITabelaTest | ITabelaTest[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TabelaTestService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      broj: 0,
      ime: 'AAAAAAA',
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

    it('should create a TabelaTest', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TabelaTest()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TabelaTest', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          broj: 1,
          ime: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TabelaTest', () => {
      const patchObject = Object.assign({}, new TabelaTest());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TabelaTest', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          broj: 1,
          ime: 'BBBBBB',
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

    it('should delete a TabelaTest', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTabelaTestToCollectionIfMissing', () => {
      it('should add a TabelaTest to an empty array', () => {
        const tabelaTest: ITabelaTest = { id: 123 };
        expectedResult = service.addTabelaTestToCollectionIfMissing([], tabelaTest);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tabelaTest);
      });

      it('should not add a TabelaTest to an array that contains it', () => {
        const tabelaTest: ITabelaTest = { id: 123 };
        const tabelaTestCollection: ITabelaTest[] = [
          {
            ...tabelaTest,
          },
          { id: 456 },
        ];
        expectedResult = service.addTabelaTestToCollectionIfMissing(tabelaTestCollection, tabelaTest);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TabelaTest to an array that doesn't contain it", () => {
        const tabelaTest: ITabelaTest = { id: 123 };
        const tabelaTestCollection: ITabelaTest[] = [{ id: 456 }];
        expectedResult = service.addTabelaTestToCollectionIfMissing(tabelaTestCollection, tabelaTest);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tabelaTest);
      });

      it('should add only unique TabelaTest to an array', () => {
        const tabelaTestArray: ITabelaTest[] = [{ id: 123 }, { id: 456 }, { id: 18442 }];
        const tabelaTestCollection: ITabelaTest[] = [{ id: 123 }];
        expectedResult = service.addTabelaTestToCollectionIfMissing(tabelaTestCollection, ...tabelaTestArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tabelaTest: ITabelaTest = { id: 123 };
        const tabelaTest2: ITabelaTest = { id: 456 };
        expectedResult = service.addTabelaTestToCollectionIfMissing([], tabelaTest, tabelaTest2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tabelaTest);
        expect(expectedResult).toContain(tabelaTest2);
      });

      it('should accept null and undefined values', () => {
        const tabelaTest: ITabelaTest = { id: 123 };
        expectedResult = service.addTabelaTestToCollectionIfMissing([], null, tabelaTest, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tabelaTest);
      });

      it('should return initial array if no TabelaTest is added', () => {
        const tabelaTestCollection: ITabelaTest[] = [{ id: 123 }];
        expectedResult = service.addTabelaTestToCollectionIfMissing(tabelaTestCollection, undefined, null);
        expect(expectedResult).toEqual(tabelaTestCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
