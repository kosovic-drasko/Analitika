export interface ITabelaTest {
  id?: number;
  broj?: number | null;
  ime?: string | null;
}

export class TabelaTest implements ITabelaTest {
  constructor(public id?: number, public broj?: number | null, public ime?: string | null) {}
}

export function getTabelaTestIdentifier(tabelaTest: ITabelaTest): number | undefined {
  return tabelaTest.id;
}
