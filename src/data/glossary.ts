export interface GlossaryItem {
  term: string
  definition: string
}

export const glossaryItems: GlossaryItem[] = [
  {
    term: 'Arcabouço Fiscal',
    definition: 'Regras que definem o limite de gastos do governo com base na arrecadação. Substituiu o "Teto de Gastos".',
  },
  {
    term: 'Emendas Pix',
    definition: 'Dinheiro enviado por deputados direto à prefeitura sem projeto específico, dificultando rastreio.',
  },
  {
    term: 'Indiciamento',
    definition: 'Ato formal da polícia apontando indícios de crime. Não é condenação — é o passo anterior à denúncia do MP.',
  },
  {
    term: 'Inelegibilidade',
    definition: 'Perda do direito de ser votado por tempo determinado (ex: 8 anos). Não significa prisão.',
  },
  {
    term: 'Renúncia Fiscal',
    definition: 'Quando o governo abre mão de cobrar um tributo. Reduz arrecadação e pode exigir cortes ou novos impostos.',
  },
  {
    term: 'PLOA',
    definition: 'Projeto de Lei Orçamentária Anual. Define quanto o governo planeja arrecadar e gastar no ano seguinte.',
  },
]
