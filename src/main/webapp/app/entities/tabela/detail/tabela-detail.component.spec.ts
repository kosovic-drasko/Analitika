import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TabelaDetailComponent } from './tabela-detail.component';

describe('Tabela Management Detail Component', () => {
  let comp: TabelaDetailComponent;
  let fixture: ComponentFixture<TabelaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tabela: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TabelaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TabelaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tabela on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tabela).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
