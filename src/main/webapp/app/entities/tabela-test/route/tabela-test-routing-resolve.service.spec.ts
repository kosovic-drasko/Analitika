import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITabelaTest, TabelaTest } from '../tabela-test.model';
import { TabelaTestService } from '../service/tabela-test.service';

import { TabelaTestRoutingResolveService } from './tabela-test-routing-resolve.service';

describe('TabelaTest routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TabelaTestRoutingResolveService;
  let service: TabelaTestService;
  let resultTabelaTest: ITabelaTest | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(TabelaTestRoutingResolveService);
    service = TestBed.inject(TabelaTestService);
    resultTabelaTest = undefined;
  });

  describe('resolve', () => {
    it('should return ITabelaTest returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTabelaTest = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTabelaTest).toEqual({ id: 123 });
    });

    it('should return new ITabelaTest if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTabelaTest = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTabelaTest).toEqual(new TabelaTest());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TabelaTest })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTabelaTest = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTabelaTest).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
