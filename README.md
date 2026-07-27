# FortixSeg

Plataforma de treinamentos online em Seguranca do Trabalho com site institucional, autenticacao, painel por perfil, checkout e validacao publica de certificados.

## Producao

- Site institucional com catalogo, pacotes corporativos, FAQ, contato e paginas internas.
- Cadastro e login para aluno, empresa, afiliado e administrador.
- Painel do aluno com cursos, biblioteca, avaliacao, progresso e certificado.
- Painel da empresa com colaboradores, relatorios, certificados e compras em lote.
- Painel do afiliado com link, cupom, indicacoes e comissoes.
- Painel admin com gestao de cursos, PDFs e configuracoes operacionais.
- API HTTP pronta para deploy em Vercel ou Node tradicional.
- Persistencia local por arquivo e suporte a Postgres/Supabase quando configurado.

## Execucao local

Precisa de Node.js 18 ou superior.

1. Crie o arquivo `.env`.
2. Preencha as variaveis obrigatorias.
3. Rode `npm install`.
4. Rode `npm start`.
5. Abra `http://127.0.0.1:3001`.

## Variaveis de ambiente

```env
PORT=3001
PUBLIC_BASE_URL=https://fortixseg.com.br

FORTIXSEG_SESSION_SECRET=troque-por-um-segredo-grande
FORTIXSEG_ADMIN_EMAIL=
FORTIXSEG_ADMIN_PASSWORD=
FORTIXSEG_ADMIN_REGISTRATION_CODE=

DATABASE_URL=
DIRECT_URL=

MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_WEBHOOK_SECRET=
MERCADO_PAGO_USE_SANDBOX=false

OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
```

Observacoes:

- `FORTIXSEG_ADMIN_EMAIL` e `FORTIXSEG_ADMIN_PASSWORD` criam a conta administrativa inicial.
- `DATABASE_URL` e `DIRECT_URL` ativam a camada Postgres/Supabase.
- Se `DATABASE_URL` nao estiver preenchida, a aplicacao usa persistencia local em arquivo.
- `PUBLIC_BASE_URL` deve ser a URL publica final do projeto.

## Rotas principais

Publicas:

- `GET /api/health`
- `GET /api/courses`
- `GET /api/certificates/validate?code=...`
- `POST /api/contact`
- `POST /api/proposals`
- `POST /api/checkout/preference`
- `POST /api/checkout-preference`

Autenticacao:

- `POST /api/auth/login`
- `POST /api/auth/register`

Aluno:

- `GET /api/student/dashboard`
- `GET /api/student/library`
- `GET /api/student/certificates/current`
- `GET /api/student/certificates/current.pdf`

Empresa:

- `GET /api/company/dashboard`
- `POST /api/company/employees`
- `POST /api/company/settings`

Afiliado:

- `GET /api/affiliate/dashboard`
- `POST /api/affiliate/settings`

Admin:

- `GET /api/admin/dashboard`
- `GET /api/admin/courses`
- `POST /api/admin/courses`
- `PUT /api/admin/courses/:id`
- `DELETE /api/admin/courses/:id`
- `POST /api/admin/courses/:id/resources`
- `DELETE /api/admin/courses/:id/resources/:resourceId`
- `POST /api/admin/settings`

## Arquivos importantes

- `server.js`: servidor HTTP e APIs.
- `script.js`: frontend, dashboards e integracao com a API.
- `index.html`: estrutura da interface.
- `data/courses.json`: catalogo persistido.
- `data/app-data.json`: dados operacionais persistidos.

## Deploy

Para deploy em producao:

1. Configure todas as variaveis no Vercel.
2. Aponte `PUBLIC_BASE_URL` para `https://fortixseg.com.br`.
3. Cadastre `DATABASE_URL` e `DIRECT_URL` do Supabase se quiser banco gerenciado.
4. Configure Mercado Pago e OpenAI somente quando as integracoes forem entrar em operacao.

## Observacao

Os dados locais em `data/*.json` nao devem ser tratados como base oficial de producao quando o projeto estiver operando com banco gerenciado.
