# FortixSeg

Plataforma MVP de treinamentos online em Seguranca do Trabalho.

Este projeto esta pronto para teste publico controlado, mas ainda nao deve ser tratado como producao final. Ele ja possui site, login de teste, area do aluno, area da empresa, area administrativa, catalogo de cursos, carrinho, checkout preparado para Mercado Pago e cadastro de curso com material em PDF.

## Estado atual

Pronto para testar:

- Home, cursos, pacotes, empresas, certificado, contato e FAQ.
- Login de aluno, empresa, afiliado e admin.
- Login administrativo com senha configurada no servidor.
- Cadastro de teste para aluno, empresa, afiliado e admin.
- Area do aluno com curso, PDF, avaliacao e certificado demonstrativo.
- Area da empresa com colaboradores, relatorios e compra em lote demonstrativa.
- Area do afiliado com link, cupom, indicacoes, comissoes e dados bancarios demonstrativos.
- Admin com cadastro, edicao, exclusao e publicacao de cursos.
- Upload de material somente em PDF.
- Catalogo de cursos gravado em `data/courses.json`.
- Checkout preparado para Mercado Pago via servidor.

Ainda demonstrativo, nao final:

- Cadastro fica em memoria enquanto o servidor estiver ligado.
- Login ainda nao usa banco real.
- Certificado e QR Code ainda sao demonstrativos.
- Pagamento aprovado ainda nao libera matricula automaticamente.
- Nao ha storage privado definitivo para arquivos.
- Nao ha logs finais de acesso, aula e avaliacao.

## Como rodar para teste

Precisa de Node.js 18 ou mais recente.

1. Copie `.env.example` para `.env`.
2. Preencha as variaveis do `.env`.
3. Rode o servidor com `npm start`.
4. Abra `http://127.0.0.1:3001` no servidor local.

Se for subir em VPS, use o IP ou dominio publico no Nginx apontando para a porta do Node.

## Configuracao obrigatoria no `.env`

```env
PORT=3001
PUBLIC_BASE_URL=https://seudominio.com.br

MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_WEBHOOK_SECRET=
MERCADO_PAGO_USE_SANDBOX=true

FORTIXSEG_SESSION_SECRET=troque-por-um-segredo-grande
FORTIXSEG_STUDENT_EMAIL=aluno@teste.com
FORTIXSEG_STUDENT_PASSWORD=123456
FORTIXSEG_COMPANY_EMAIL=empresa@teste.com
FORTIXSEG_COMPANY_PASSWORD=123456
FORTIXSEG_AFFILIATE_EMAIL=afiliado@teste.com
FORTIXSEG_AFFILIATE_PASSWORD=123456
FORTIXSEG_ADMIN_EMAIL=admin@teste.com
FORTIXSEG_ADMIN_PASSWORD=123456
FORTIXSEG_ADMIN_REGISTRATION_CODE=FORTIX-ADMIN-2026

OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4-mini
```

Importante: nunca envie `.env` para GitHub, ZIP publico, hospedagem estatica ou chat. Ele contem chaves e senhas.

## Logins de teste

Aluno:

```text
aluno@teste.com
123456
```

Empresa:

```text
empresa@teste.com
123456
```

Afiliado:

```text
afiliado@teste.com
123456
```

Admin:

```text
admin@teste.com
123456
```

Antes de abrir para cliente real, troque `FORTIXSEG_ADMIN_PASSWORD` e `FORTIXSEG_ADMIN_REGISTRATION_CODE` no `.env`.

## Cadastro de teste

O cadastro de aluno, empresa e afiliado funciona para teste: ao criar a conta, o usuario ja entra na area correta.

O cadastro de admin tambem funciona, mas exige o codigo definido em:

```text
FORTIXSEG_ADMIN_REGISTRATION_CODE
```

Codigo demonstrativo padrao:

```text
FORTIX-ADMIN-2026
```

Nesta fase, o cadastro fica em memoria no servidor. Se o servidor reiniciar, os cadastros criados no teste sao perdidos. Em producao, isso deve ir para Supabase Auth/PostgreSQL.

## Cursos e materiais

O catalogo editavel fica em:

```text
data/courses.json
```

Pelo admin, e possivel cadastrar:

- codigo do curso;
- nome;
- categoria;
- carga horaria;
- preco;
- status publicado ou rascunho;
- quantidade de aulas;
- nota minima;
- tentativas;
- publico-alvo;
- objetivo;
- conteudo programatico;
- materiais em PDF.

Por enquanto, o treinamento aceita somente PDF. Outros formatos de aula devem entrar em uma fase futura com storage protegido e controle de acesso.

PDFs enviados pelo admin ficam em:

```text
assets/uploads/courses/
```

Limite demonstrativo por arquivo:

```text
12 MB
```

Para uso real em escala, o recomendado e mover PDFs, apostilas e certificados para uma nuvem/storage privado, como Cloudflare R2, S3, Supabase Storage ou servidor dedicado com backup.

## APIs principais

Rotas publicas:

- `GET /api/health`
- `GET /api/courses`
- `GET /api/certificates/validate?code=FS-NR35-2026-000123`
- `POST /api/checkout/preference`
- `POST /api/checkout-preference`

Rotas de autenticacao:

- `POST /api/auth/demo`
- `POST /api/auth/register`

Rotas protegidas por perfil:

- `GET /api/student/dashboard`
- `GET /api/student/library`
- `GET /api/company/dashboard`
- `POST /api/company/employees`
- `GET /api/affiliate/dashboard`
- `GET /api/admin/dashboard`
- `GET /api/admin/courses`
- `POST /api/admin/courses`
- `PUT /api/admin/courses/:id`
- `DELETE /api/admin/courses/:id`
- `POST /api/admin/courses/:id/resources`
- `DELETE /api/admin/courses/:id/resources/:resourceId`

As rotas protegidas precisam receber o token criado no login.

## Mercado Pago

O checkout deve ser criado no servidor, nunca no navegador.

Para testar:

1. Coloque o token de teste em `MERCADO_PAGO_ACCESS_TOKEN`.
2. Deixe `MERCADO_PAGO_USE_SANDBOX=true`.
3. Configure `PUBLIC_BASE_URL` com a URL publica HTTPS do site.
4. Teste comprando um curso pelo carrinho.

O botao de checkout chama:

```text
/api/checkout/preference
```

Tambem existe compatibilidade com:

```text
/api/checkout-preference
```

Antes de vender de verdade, ainda falta salvar o pedido, receber webhook, confirmar pagamento aprovado no servidor e liberar a matricula somente depois disso.

## Onde alterar marca e textos

No inicio de `script.js`, edite `APP_CONFIG`.

## Onde alterar pacotes

No `script.js`, edite:

- `trainingPackages`
- `discountTiers`
- textos das secoes publicas

## Onde alterar catalogo inicial

Com o servidor ligado, prefira alterar pelo admin. As mudancas sao gravadas em `data/courses.json`.

A lista grande de fallback do front fica em `courseCatalogRows`, dentro de `script.js`.

## Publicacao em VPS

Fluxo recomendado:

```text
Node.js
PM2
Nginx
SSL com Certbot
Dominio apontado para o IP do VPS
```

O Nginx recebe o acesso publico e repassa para o Node. O SSL deixa o site em HTTPS.

## Proximas etapas para producao

- Supabase Auth ou outro login real.
- PostgreSQL para usuarios, empresas, matriculas, pagamentos, certificados e progresso.
- Storage privado para PDFs e certificados.
- Geracao real de certificado em PDF.
- QR Code unico por certificado.
- Webhook Mercado Pago liberando matricula apos pagamento aprovado.
- Logs de acesso, progresso, avaliacao e conclusao.
- Backup automatico.
- Politica de privacidade, termos de uso e LGPD.
