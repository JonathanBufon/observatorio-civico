# Observatório Cívico

Plataforma de transparência radical para análise de políticas governamentais e operações políticas brasileiras. Apresenta relatórios analíticos aprofundados com foco em expor beneficiários reais, cortinas de fumaça e contradições entre o discurso oficial e a realidade.

**Sem Viés. Sem Ads. Open Source.**

---

## Funcionalidades

- **Relatórios analíticos** com estrutura padronizada por seção
- **Grade de análise** com beneficiados reais e efeitos práticos de cada política
- **Detecção de cortina de fumaça** destacando narrativas manipuladoras
- **Confrontação discurso vs. realidade** com comparação lado a lado
- **Raio-X de figuras públicas** com perfis biográficos e contexto político
- **Glossário tático** com terminologia política explicada
- **Sistema de vocabulário inline** com tooltips via sintaxe `{{termo|definição}}`
- **Referências em vídeo** para contextualização

---

## Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Estilização | Tailwind CSS 3 |
| Animações | Framer Motion 11 |
| Roteamento | React Router DOM 6 |
| Ícones | Lucide React |

---

## Pré-requisitos

- Node.js 18+
- npm 9+

---

## Instalação e uso

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Pré-visualizar build de produção
npm run preview
```

O servidor de desenvolvimento estará disponível em `http://localhost:5173`.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/          # Header, Footer, MainLayout
│   ├── report/          # Componentes das seções dos relatórios
│   ├── bigbrother/      # Elemento decorativo animado
│   ├── glossary/        # Glossário tático
│   └── ui/              # Componentes reutilizáveis (VocabTag, MetaTag, SectionLabel)
├── data/
│   ├── reports.ts       # Dados dos relatórios
│   └── glossary.ts      # Termos do glossário
├── hooks/
│   └── useMediaQuery.ts # Hook para responsividade
├── pages/
│   └── HomePage.tsx     # Página principal
└── utils/
    └── parseVocab.tsx   # Parser da sintaxe {{termo|definição}}
```

---

## Estrutura de um relatório

Cada relatório segue a interface TypeScript abaixo:

```ts
{
  id: string
  tags: string[]
  featured?: boolean
  title: string
  lead: string
  analysis: {
    beneficiados: string[]
    efeitos: string[]
  }
  smokeScreen?: {
    label: string
    items: { label: string; text: string }[]
  }
  confrontation?: {
    discourse: string[]
    reality: string[]
  }
  profiles?: {
    name: string
    role: string
    bio: string
  }[]
  videoRef?: {
    title: string
    description: string
    url: string
  }
  sources?: string[]
}
```

Para adicionar um novo relatório, edite `src/data/reports.ts`.

---

## Integração com backend (futuro)

O arquivo `ContratoAPI.md` documenta a especificação da API para integração futura com backend Express + MongoDB. Os endpoints planejados incluem:

- `GET /api/news` — listagem com paginação
- `GET /api/news/featured` — relatórios em destaque
- `GET /api/news/category/:category` — filtro por categoria
- CRUD completo via `POST`, `PUT`, `DELETE`

Atualmente todos os dados são estáticos em TypeScript.

---

## Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'feat: descrição da mudança'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

---

## Licença

Open Source — consulte o arquivo `LICENSE` para detalhes.
