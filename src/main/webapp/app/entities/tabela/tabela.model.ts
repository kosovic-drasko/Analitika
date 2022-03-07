export interface ITabela {
  id?: number;
  region?: string;
  promet?: number;
}

export class Tabela implements ITabela {
  constructor(public id?: number, public region?: string, public promet?: number) {}
}

export function getTabelaIdentifier(tabela: ITabela): number | undefined {
  return tabela.id;
}
