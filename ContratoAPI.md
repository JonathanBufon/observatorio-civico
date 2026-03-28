# Contrato da API — Observatório Cívico

## Estado atual do seu código

Analisei o repositório. Aqui está o que existe e o que precisa mudar:

**O que você tem:**
- Express 5 + Mongoose + MongoDB (stack boa, mantém)
- Model `Noticia.js` — schema vazio/comentado
- Controller com `getByTitle` e `getByCategory` (lógica ok, mas buscam campos que não existem no schema)
- Rotas com problema de sintaxe (falta `/` antes dos params)

**O que o frontend precisa para renderizar cada seção do mockup:**

```
Seção do mockup              → Campo da API necessário
─────────────────────────────────────────────────────
Meta ID + Badge "Destaque"   → id, destaque
Tags (Economia, Orçamento)   → categorias[]
Barra de fontes              → fontes[]
Título principal             → titulo
Parágrafo introdutório       → resumo
Grid Beneficiados            → analise.beneficiados[]
Grid Efeitos Práticos        → analise.efeitosPraticos[]
Cortina de Fumaça            → cortinaFumaca{}
Confronto Discurso/Realidade → confronto{}
Raio-X dos Agentes           → agentesPublicos[]
Vídeo de Contexto            → videoReferencia{}
Vocab-tags (tooltips)        → glossario[] (por relatório)
```

---

## 1. Mongoose Schema — copiar para `src/models/Noticia.js`

```javascript
import mongoose from 'mongoose';

const noticiaSchema = new mongoose.Schema({

    // ── DADOS BÁSICOS (o que você já planejava) ──
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    resumo: {
        type: String,
        required: true
    },
    linkSite: {
        type: String,
        trim: true
    },
    dataPublicacao: {
        type: Date,
        default: Date.now
    },
    dataExpiracao: {
        type: Date
    },
    destaque: {
        type: Boolean,
        default: false
    },
    categorias: [{
        type: String,
        enum: ['economia', 'orcamento', 'judiciario', 'legislativo', 'saude', 'educacao', 'seguranca', 'internacional'],
        required: true
    }],
    fontes: [{
        type: String,
        trim: true
    }],

    // ── ANÁLISE (grid Beneficiados + Efeitos) ──
    analise: {
        beneficiados: [{
            tipo: {
                type: String,
                enum: ['direto', 'indireto'],
                required: true
            },
            descricao: {
                type: String,
                required: true
            }
        }],
        efeitosPraticos: [{
            type: String
        }]
    },

    // ── CORTINA DE FUMAÇA ──
    cortinaFumaca: {
        titulo: { type: String },
        descricao: { type: String },
        evidencias: [{
            rotulo: { type: String },
            texto: { type: String }
        }]
    },

    // ── CONFRONTO: DISCURSO vs REALIDADE ──
    confronto: {
        discursoOficial: { type: String },
        realidade: { type: String }
    },

    // ── RAIO-X DOS AGENTES PÚBLICOS ──
    agentesPublicos: [{
        nome: { type: String, required: true },
        iniciais: { type: String, required: true },
        cargo: { type: String, required: true },
        historico: { type: String, required: true }
    }],

    // ── VÍDEO DE REFERÊNCIA ──
    videoReferencia: {
        titulo: { type: String },
        descricao: { type: String },
        url: { type: String }
    },

    // ── GLOSSÁRIO INLINE (termos que viram tooltip no texto) ──
    glossario: [{
        termo: { type: String, required: true },
        definicao: { type: String, required: true }
    }]

}, {
    timestamps: true
});

// Índices para as buscas que você já tem
noticiaSchema.index({ titulo: 'text' });
noticiaSchema.index({ categorias: 1 });
noticiaSchema.index({ dataPublicacao: -1 });
noticiaSchema.index({ destaque: 1, dataPublicacao: -1 });

const Noticia = mongoose.model('Noticia', noticiaSchema);
export default Noticia;
```

---

## 2. Rotas corrigidas — `src/routes/newsRoutes.js`

Seu código atual tem problemas de sintaxe nas rotas (falta `/` antes dos params e falta `export`):

```javascript
import express from "express";
import {
    getAllNews,
    getById,
    getByTitle,
    getByDate,
    getByCategory,
    getFeatured,
    createNews
} from "../controllers/newsController.js";

const router = express.Router();

// GET — listagem
router.get("/", getAllNews);                         // GET /api/news
router.get("/featured", getFeatured);                // GET /api/news/featured
router.get("/id/:id", getById);                      // GET /api/news/id/abc123
router.get("/title/:title", getByTitle);             // GET /api/news/title/salario
router.get("/date/:startDate/:endDate", getByDate);  // GET /api/news/date/2026-01-01/2026-12-31
router.get("/category/:category", getByCategory);    // GET /api/news/category/economia

// POST — criação
router.post("/", createNews);                        // POST /api/news

export default router;
```

---

## 3. Controller completo — `src/controllers/newsController.js`

```javascript
import Noticia from "../models/Noticia.js";

// Listar todos (com paginação)
export const getAllNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const news = await Noticia.find({ dataExpiracao: { $gte: new Date() } })
            .sort({ destaque: -1, dataPublicacao: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Noticia.countDocuments({ dataExpiracao: { $gte: new Date() } });

        res.status(200).json({
            data: news,
            page,
            totalPages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar notícias", error: error.message });
    }
};

// Buscar por ID
export const getById = async (req, res) => {
    try {
        const news = await Noticia.findById(req.params.id);
        if (!news) return res.status(404).json({ message: "Notícia não encontrada" });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar notícia", error: error.message });
    }
};

// Buscar por título (regex)
export const getByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const news = await Noticia.find({
            titulo: { $regex: title, $options: 'i' }
        }).sort({ dataPublicacao: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar por título", error: error.message });
    }
};

// Buscar por intervalo de datas
export const getByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.params;
        const news = await Noticia.find({
            dataPublicacao: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ dataPublicacao: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar por data", error: error.message });
    }
};

// Buscar por categoria
export const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const news = await Noticia.find({
            categorias: category
        }).sort({ dataPublicacao: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar por categoria", error: error.message });
    }
};

// Buscar destaques
export const getFeatured = async (req, res) => {
    try {
        const news = await Noticia.find({
            destaque: true,
            dataExpiracao: { $gte: new Date() }
        }).sort({ dataPublicacao: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar destaques", error: error.message });
    }
};

// Criar notícia
export const createNews = async (req, res) => {
    try {
        const noticia = new Noticia(req.body);
        const saved = await noticia.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar notícia", error: error.message });
    }
};
```

---

## 4. Exemplo de POST completo para criar uma notícia

Esse é o JSON que você mandaria via POST para `/api/news` e que o frontend consegue renderizar 100%:

```json
{
    "titulo": "Governo Propõe Salário Mínimo de R$ 1.627 para 2026 e Avança Isenção do IR",
    "resumo": "O governo federal enviou ao Congresso o PLOA prevendo o salário mínimo de R$ 1.627,00 para 2026 — reajuste de 7,44% sobre o piso atual. A medida ocorre em paralelo à implementação da isenção de IR para quem ganha até R$ 5.000, promessa de campanha agendada para o ano eleitoral.",
    "linkSite": "https://www12.senado.leg.br/noticias",
    "dataPublicacao": "2026-03-15T10:00:00Z",
    "dataExpiracao": "2026-09-15T23:59:59Z",
    "destaque": true,
    "categorias": ["economia", "orcamento"],
    "fontes": ["Agência Senado", "Agência Câmara", "Portal da Transparência (PLOA)"],

    "analise": {
        "beneficiados": [
            {
                "tipo": "direto",
                "descricao": "Aposentados, pensionistas do INSS e trabalhadores que recebem o piso (~54 milhões de pessoas) com recomposição inflacionária + ganho real limitado."
            },
            {
                "tipo": "indireto",
                "descricao": "Mercado financeiro e rentistas. A limitação do salário mínimo preserva orçamento para juros da dívida."
            }
        ],
        "efeitosPraticos": [
            "O aumento segue a regra do pacote fiscal de 2024, que limitou o ganho real a 2,5% ao ano. O trabalhador recebe aumento nominal, mas o poder de compra cresce em ritmo travado.",
            "A isenção do IR funciona como renúncia fiscal que pressiona as contas públicas, exigindo cortes em outras áreas ou aumento de impostos sobre consumo."
        ]
    },

    "cortinaFumaca": {
        "titulo": "A Narrativa do \"Imposto para os Ricos\"",
        "descricao": "O governo enfatiza a taxação de \"super-ricos\" (renda acima de R$ 50 mil) como compensação para a isenção do IR da classe média.",
        "evidencias": [
            {
                "rotulo": "Ocultação",
                "texto": "A arrecadação com \"super-ricos\" é volátil e insuficiente para cobrir o rombo da isenção geral."
            },
            {
                "rotulo": "Manipulação",
                "texto": "O foco na isenção em 2026 desvia a atenção dos cortes em benefícios previdenciários e no Abono Salarial."
            }
        ]
    },

    "confronto": {
        "discursoOficial": "Afirma que o orçamento de 2026 é \"socialmente equilibrado\" e promove justiça fiscal.",
        "realidade": "O reajuste de R$ 1.627 está atrelado a travas fiscais. O governo \"dá com uma mão\" (isenção de IR) no ano eleitoral, enquanto \"tira com a outra\" (travas no ganho real e restrições no abono)."
    },

    "agentesPublicos": [
        {
            "nome": "Luiz Inácio Lula da Silva",
            "iniciais": "L",
            "cargo": "Presidente",
            "historico": "Governa em busca da reeleição. Histórico inclui condenações na Lava Jato por corrupção passiva e lavagem de dinheiro, anuladas pelo STF por questões processuais, sem absolvição do mérito."
        },
        {
            "nome": "Fernando Haddad",
            "iniciais": "FH",
            "cargo": "Ministro da Fazenda",
            "historico": "Articulador do pacote fiscal. Réu por caixa dois em 2012 (absolvido pelo TRE-SP). Alvo de inquéritos por corrupção baseados em delações da Odebrecht (arquivados por falta de provas)."
        }
    ],

    "videoReferencia": {
        "titulo": "Cortes de gastos e manobras no orçamento explicados",
        "descricao": "Vídeo sobre a aprovação do pacote fiscal de 2024 e as limitações estruturais do cenário vigente.",
        "url": "https://youtube.com/watch?v=exemplo"
    },

    "glossario": [
        { "termo": "PLOA", "definicao": "Projeto de Lei Orçamentária Anual. Define quanto o governo planeja arrecadar e gastar no ano seguinte." },
        { "termo": "rentistas", "definicao": "Pessoas que vivem de rendimentos de investimentos, como juros de títulos públicos." },
        { "termo": "renúncia fiscal", "definicao": "Quando o governo abre mão de receber dinheiro de impostos." }
    ]
}
```

---

## 5. Glossário Geral (endpoint separado, opcional)

O glossário tático que aparece no rodapé da página é compartilhado entre todas as notícias. Pode ser um model e endpoint separado:

**Model** `src/models/Glossario.js`:
```javascript
import mongoose from 'mongoose';

const glossarioSchema = new mongoose.Schema({
    termo: { type: String, required: true, unique: true, trim: true },
    definicao: { type: String, required: true }
}, { timestamps: true });

const Glossario = mongoose.model('Glossario', glossarioSchema);
export default Glossario;
```

**Rota**: `GET /api/glossario` → retorna todos os termos

---

## 6. Resumo — o que mudar no seu código

| Arquivo | Ação |
|---------|------|
| `src/models/Noticia.js` | Substituir pelo schema completo da seção 1 |
| `src/controllers/newsController.js` | Substituir pelo controller da seção 3 |
| `src/routes/newsRoutes.js` | Substituir pelas rotas da seção 2 |
| `src/models/Glossario.js` | **Criar** (opcional, seção 5) |
| `src/routes/glossarioRoutes.js` | **Criar** (opcional) |
| `server.js` | Adicionar `app.use('/api/glossario', glossarioRoutes)` |

---

## 7. Campos obrigatórios vs opcionais

O frontend renderiza condicionalmente — se o campo não existir, a seção simplesmente não aparece:

**Obrigatórios** (sem eles o card não faz sentido):
- `titulo`, `resumo`, `categorias`, `dataPublicacao`

**Importantes** (sem eles o card fica vazio demais):
- `analise.beneficiados`, `analise.efeitosPraticos`, `cortinaFumaca`

**Opcionais** (renderiza se existir, ignora se não):
- `destaque`, `fontes`, `confronto`, `agentesPublicos`, `videoReferencia`, `glossario`, `linkSite`, `dataExpiracao`

Isso permite que vocês alimentem gradualmente — comecem só com título + resumo + categorias + análise, e vão adicionando as seções mais ricas conforme o conteúdo fica pronto.