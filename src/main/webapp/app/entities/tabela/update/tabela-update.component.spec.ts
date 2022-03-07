import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TabelaService } from '../service/tabela.service';
import { ITabela, Tabela } from '../tabela.model';

import { TabelaUpdateComponent } from './tabela-update.component';

describe('Tabela Management Update Component', () => {
  let comp: TabelaUpdateComponent;
  let fixture: ComponentFixture<TabelaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tabelaService: TabelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TabelaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TabelaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TabelaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tabelaService = TestBed.inject(TabelaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tabela: ITabela = { id: 456 };

      activatedRoute.data = of({ tabela });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(tabela));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tabela>>();
      const tabela = { id: 123 };
      jest.spyOn(tabelaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tabela });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tabela }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(tabelaService.update).toHaveBeenCalledWith(tabela);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tabela>>();
      const tabela = new Tabela();
      jest.spyOn(tabelaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tabela });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tabela }));
      saveSubject.complete();

      // THEN
      expect(tabelaService.create).toHaveBeenCalledWith(tabela);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Tabela>>();
      const tabela = { id: 123 };
      jest.spyOn(tabelaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tabela });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tabelaService.update).toHaveBeenCalledWith(tabela);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
