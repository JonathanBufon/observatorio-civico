export type TagCategory = 'economia' | 'orcamento' | 'judiciario' | 'legislativo'

export interface ReportTag {
  label: string
  category: TagCategory
}

export interface AnalysisBeneficiary {
  label: string
  text: string
}

export interface EvidenceItem {
  label: string
  text: string
}

export interface PublicProfile {
  initials: string
  name: string
  role: string
  bio: string
}

export interface Report {
  id: string
  tags: ReportTag[]
  featured?: boolean
  sources?: string[]
  title: string
  lead: string
  analysis: {
    beneficiaries: { items: { bold?: string; text: string }[] }
    effects: { paragraphs: string[] }
  }
  smokeScreen: {
    title?: string
    description?: string
    evidence?: EvidenceItem[]
  }
  confrontation?: {
    official: string
    reality: string
  }
  profiles: PublicProfile[]
  videoRef?: {
    title: string
    description: string
  }
}

export const reports: Report[] = [
  {
    id: '#2026-PREV-01',
    tags: [
      { label: 'Economia', category: 'economia' },
      { label: 'Orçamento', category: 'orcamento' },
    ],
    featured: true,
    sources: ['Agência Senado', 'Agência Câmara', 'Portal da Transparência (PLOA)'],
    title: 'Governo Propõe Salário Mínimo de R$ 1.627 para 2026 e Avança Isenção do IR',
    lead: 'O governo federal enviou ao Congresso o {{PLOA|Proposta detalhada de arrecadação e gastos do governo para o ano seguinte}} prevendo o salário mínimo de R$ 1.627,00 para 2026 — reajuste de 7,44% sobre o piso atual. A medida ocorre em paralelo à implementação da isenção de IR para quem ganha até R$ 5.000, promessa de campanha agendada para o ano eleitoral.',
    analysis: {
      beneficiaries: {
        items: [
          { bold: 'Diretos:', text: 'Aposentados, pensionistas do INSS e trabalhadores que recebem o piso (~54 milhões de pessoas) com recomposição inflacionária + ganho real limitado.' },
          { bold: 'Indiretos:', text: 'Mercado financeiro e {{rentistas|Pessoas que vivem de rendimentos de investimentos}}. A limitação do salário mínimo preserva orçamento para juros da dívida.' },
        ],
      },
      effects: {
        paragraphs: [
          'O aumento segue a regra do pacote fiscal de 2024, que limitou o ganho real a 2,5% ao ano. O trabalhador recebe aumento nominal, mas o poder de compra cresce em ritmo travado.',
          'A isenção do IR funciona como {{renúncia fiscal|Quando o governo abre mão de receber dinheiro de impostos}} que pressiona as contas públicas, exigindo cortes em outras áreas ou aumento de impostos sobre consumo.',
        ],
      },
    },
    smokeScreen: {
      title: 'A Narrativa do "Imposto para os Ricos"',
      description: 'O governo enfatiza a taxação de "super-ricos" (renda acima de R$ 50 mil) como compensação para a isenção do IR da classe média.',
      evidence: [
        { label: 'Ocultação:', text: 'A arrecadação com "super-ricos" é volátil e insuficiente para cobrir o rombo da isenção geral.' },
        { label: 'Manipulação:', text: 'O foco na isenção em 2026 desvia a atenção dos cortes em benefícios previdenciários e no Abono Salarial.' },
      ],
    },
    confrontation: {
      official: 'Afirma que o orçamento de 2026 é "socialmente equilibrado" e promove justiça fiscal.',
      reality: 'O reajuste de R$ 1.627 está atrelado a travas fiscais. O governo "dá com uma mão" (isenção de IR) no ano eleitoral, enquanto "tira com a outra" (travas no ganho real e restrições no abono).',
    },
    profiles: [
      {
        initials: 'L',
        name: 'Luiz Inácio Lula da Silva',
        role: 'Presidente',
        bio: 'Governa em busca da reeleição. Histórico inclui condenações na Lava Jato por corrupção passiva e lavagem de dinheiro, anuladas pelo STF por questões processuais, sem absolvição do mérito.',
      },
      {
        initials: 'FH',
        name: 'Fernando Haddad',
        role: 'Ministro da Fazenda',
        bio: 'Articulador do pacote fiscal. Réu por caixa dois em 2012 (absolvido pelo TRE-SP). Alvo de inquéritos por corrupção baseados em delações da Odebrecht (arquivados por falta de provas).',
      },
    ],
    videoRef: {
      title: 'Cortes de gastos e manobras no orçamento explicados',
      description: 'Vídeo sobre a aprovação do pacote fiscal de 2024 e as limitações estruturais do cenário vigente.',
    },
  },
  {
    id: '#2024-FIM-02',
    tags: [{ label: 'Judiciário / Militar', category: 'judiciario' }],
    title: 'Indiciamento de Bolsonaro e Generais',
    lead: 'PF indicia ex-presidente e alta cúpula militar por tentativa de golpe de Estado, abolição violenta do Estado de Direito e organização criminosa.',
    analysis: {
      beneficiaries: {
        items: [
          { bold: 'Diretos:', text: 'Governo atual (enfraquecimento jurídico/moral da oposição).' },
          { bold: 'Indiretos:', text: 'STF (validação das ações rigorosas nos inquéritos anteriores).' },
        ],
      },
      effects: {
        paragraphs: [
          'Consolidação jurídica da {{inelegibilidade|Impedimento de ser votado}} da liderança de direita e isolamento das Forças Armadas da política.',
        ],
      },
    },
    smokeScreen: {
      description: 'A gravidade dos detalhes monopoliza a pauta midiática, reduzindo o espaço para críticas sobre gestão administrativa, inflação ou articulação no Congresso.',
    },
    profiles: [
      {
        initials: 'JB',
        name: 'Jair Bolsonaro',
        role: 'Ex-Presidente',
        bio: 'Declarado inelegível pelo TSE. {{Indiciado|Acusação formal da polícia}} pela PF em três inquéritos: cartão de vacina, joias sauditas e golpe de Estado.',
      },
    ],
  },
  {
    id: '#2024-FIM-03',
    tags: [{ label: 'Legislativo', category: 'legislativo' }],
    title: 'Disputa das "Emendas Pix"',
    lead: 'STF mantém bloqueio de emendas até garantia de rastreabilidade. Congresso cede e cria novas regras para liberação.',
    analysis: {
      beneficiaries: {
        items: [
          { bold: 'Diretos:', text: 'Poder Executivo (recupera controle orçamentário).' },
          { bold: 'Indiretos:', text: 'Sociedade civil (ganho teórico de ferramentas de fiscalização).' },
        ],
      },
      effects: {
        paragraphs: [
          'Disputa de poder bruto. O Congresso tenta manter controle financeiro ({{"Orçamento Secreto" 2.0|Mecanismo onde verbas são distribuídas sem transparência}}); o STF freia a autonomia desregulada.',
        ],
      },
    },
    smokeScreen: {
      description: 'O discurso de "independência dos poderes" mascara a manutenção de um balcão de negócios onde verbas são trocadas por apoio político sem fiscalização.',
    },
    profiles: [
      {
        initials: 'AL',
        name: 'Arthur Lira',
        role: 'Presidente da Câmara',
        bio: 'Investigado por corrupção passiva (denúncia rejeitada pelo STF em 2023). Figura central no controle das {{Emendas Pix|Recurso enviado direto à prefeitura sem projeto definido}}.',
      },
    ],
  },
]
