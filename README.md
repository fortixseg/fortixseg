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

1. Copie `.env.example` para `.env`.
2. Preencha as variaveis obrigatorias, principalmente admin e Mercado Pago.
3. Rode `npm install`.
4. Rode `npm start`.
5. Abra `http://127.0.0.1:3001`.

## Logins de teste

Os acessos abaixo ficam disponiveis para teste local. Antes de publicar, troque a senha do admin no `.env`.

```text
Aluno:
aluno@teste.com
123456

Empresa:
empresa@teste.com
123456

Afiliado:
afiliado@teste.com
123456

Admin:
admin@teste.com
defina em FORTIXSEG_ADMIN_PASSWORD
```

## Variaveis de ambiente

```env
PORT=3001
PUBLIC_BASE_URL=https://fortixseg.com.br

FORTIXSEG_SESSION_SECRET=troque-por-um-segredo-grande
FORTIXSEG_STUDENT_EMAIL=aluno@teste.com
FORTIXSEG_STUDENT_PASSWORD=123456
FORTIXSEG_COMPANY_EMAIL=empresa@teste.com
FORTIXSEG_COMPANY_PASSWORD=123456
FORTIXSEG_AFFILIATE_EMAIL=afiliado@teste.com
FORTIXSEG_AFFILIATE_PASSWORD=123456
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
- `FORTIXSEG_ADMIN_REGISTRATION_CODE` libera cadastro de novos administradores pela tela de cadastro.
- `DATABASE_URL` e `DIRECT_URL` ativam a camada Postgres/Supabase.
- Se `DATABASE_URL` nao estiver preenchida, a aplicacao usa persistencia local em arquivo.
- `PUBLIC_BASE_URL` deve ser a URL publica final do projeto.
- `MERCADO_PAGO_ACCESS_TOKEN` nunca deve ser colocado em `index.html` ou `script.js`; use somente `.env` no servidor.

## Fluxos ja preparados

- Admin cadastra curso, altera preco, define carga horaria, nota minima, tentativas e publica/rascunho.
- Admin anexa apostilas em PDF ao curso.
- Aluno faz avaliacao; com nota minima de 70%, o certificado e liberado.
- Certificado pode ser baixado em PDF com QR Code e validado publicamente por codigo.
- Empresa cadastra colaboradores e acompanha painel corporativo.
- Afiliado acessa link, cupom, indicacoes e comissoes demonstrativas.
- Checkout cria preferencia no Mercado Pago quando `MERCADO_PAGO_ACCESS_TOKEN` estiver configurado.

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
