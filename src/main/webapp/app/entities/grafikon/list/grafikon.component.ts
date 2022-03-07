import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IGrafikon } from '../grafikon.model';
import { GrafikonService } from '../service/grafikon.service';

@Component({
  selector: 'jhi-grafikon',
  templateUrl: './grafikon.component.html',
})
export class GrafikonComponent implements OnInit {
  grafikons?: IGrafikon[];
  isLoading = false;

  constructor(protected grafikonService: GrafikonService) {}

  loadAll(): void {
    this.isLoading = true;

    this.grafikonService.query().subscribe({
      next: (res: HttpResponse<IGrafikon[]>) => {
        this.isLoading = false;
        this.grafikons = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IGrafikon): number {
    return item.id!;
  }
}
