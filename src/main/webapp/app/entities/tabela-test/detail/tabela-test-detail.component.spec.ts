import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TabelaTestDetailComponent } from './tabela-test-detail.component';

describe('TabelaTest Management Detail Component', () => {
  let comp: TabelaTestDetailComponent;
  let fixture: ComponentFixture<TabelaTestDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaTestDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tabelaTest: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TabelaTestDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TabelaTestDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tabelaTest on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tabelaTest).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
