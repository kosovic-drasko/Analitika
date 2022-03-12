import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TabelaTestService } from '../service/tabela-test.service';

import { TabelaTestComponent } from './tabela-test.component';

describe('TabelaTest Management Component', () => {
  let comp: TabelaTestComponent;
  let fixture: ComponentFixture<TabelaTestComponent>;
  let service: TabelaTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TabelaTestComponent],
    })
      .overrideTemplate(TabelaTestComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TabelaTestComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TabelaTestService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.tabelaTests?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
