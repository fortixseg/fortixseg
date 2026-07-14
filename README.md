# FortixSeg

Plataforma de treinamentos online em Segurança do Trabalho, com front-end demonstrativo, atendente virtual e estrutura de Checkout Pro do Mercado Pago.

## Abrir no modo demonstrativo

Abra `index.html` diretamente no navegador. Navegação, cursos, carrinho, dashboards e atendente local funcionam sem instalação. Nesse modo não há cobrança nem consulta à IA externa.

## Ativar Mercado Pago e IA

É necessário Node.js 18 ou mais recente.

1. Duplique `.env.example` com o nome `.env`.
2. Preencha as credenciais dentro do `.env`. Nunca coloque as chaves em `script.js`, publique o `.env` ou envie as chaves pelo chat.
3. No terminal, dentro desta pasta, execute `npm start`.
4. Abra `http://127.0.0.1:3001`.

O projeto não possui dependências externas de Node, portanto não é necessário executar `npm install`.

Exemplo de configuração local:

```env
PORT=3000
PUBLIC_BASE_URL=
MERCADO_PAGO_ACCESS_TOKEN=SEU_TOKEN
MERCADO_PAGO_WEBHOOK_SECRET=SEU_SEGREDO
MERCADO_PAGO_USE_SANDBOX=true
APP_JWT_SECRET=TROQUE_ESTE_SEGREDO
OPENAI_API_KEY=SUA_CHAVE
OPENAI_MODEL=gpt-5.4-mini
```

## Mercado Pago

O botão **Finalizar compra** envia apenas os IDs e quantidades ao servidor. O servidor consulta seu próprio catálogo, calcula os valores corretos, cria uma preferência do Checkout Pro e redireciona o cliente ao Mercado Pago.

Para publicar:

- Defina `PUBLIC_BASE_URL` com o domínio público HTTPS, sem `localhost`.
- Cadastre `/api/mercado-pago/webhook` como URL de notificação.
- Use credenciais e usuários de teste antes de mudar para produção.
- Confirme o status do pagamento no servidor antes de matricular ou liberar qualquer curso.

O webhook já valida a assinatura secreta. A gravação da ordem, consulta final do pagamento, idempotência e matrícula estão marcadas como próximas etapas em `server.js`.

## Atendente com IA

Com `OPENAI_API_KEY` configurada, o chat chama a Responses API pelo servidor. A chave nunca chega ao navegador. Se a API estiver desligada ou indisponível, o atendente continua respondendo com a base local já existente.

O modelo pode ser alterado em `OPENAI_MODEL`. O padrão é `gpt-5.4-mini`, escolhido para equilibrar qualidade, velocidade e custo.

## Autenticação local

O projeto agora usa autenticação local com JWT assinado no servidor e cookie `HttpOnly`. O navegador não armazena token de login em `localStorage`.

- `POST /api/auth/login`: autentica aluno, empresa ou admin.
- `POST /api/auth/register`: cria conta local de aluno ou empresa.
- `GET /api/auth/session`: devolve o usuário autenticado pela sessão atual.
- `POST /api/auth/logout`: encerra a sessão atual.

Os usuários e cadastros locais ficam persistidos em `data/app-data.json`.

## APIs demonstrativas da plataforma

As áreas internas tentam carregar dados pelo servidor e usam o modo local como fallback:

- `POST /api/auth/login`: login local com JWT em cookie `HttpOnly`.
- `POST /api/auth/register`: criação de conta local.
- `GET /api/auth/session`: leitura da sessão autenticada.
- `POST /api/auth/logout`: encerramento da sessão.
- `GET /api/courses`: catálogo e preços usados pelo front-end.
- `GET /api/student/dashboard`: métricas e próximas ações do aluno.
- `GET /api/student/library`: vídeos, PDFs e metadados da biblioteca do curso.
- `POST /api/student/progress`: atualização do progresso do curso do aluno.
- `POST /api/student/assessment`: envio do resultado da avaliação e emissão de certificado quando aprovado.
- `GET /api/company/dashboard`: métricas, alertas e colaboradores da empresa.
- `POST /api/company/employees`: cadastro demonstrativo de colaborador.
- `GET /api/admin/dashboard`: métricas, integrações, alunos e pagamentos recentes.
- `GET /api/admin/courses`: catálogo completo, incluindo rascunhos e materiais.
- `POST /api/admin/courses`: cadastro de um novo curso.
- `PUT /api/admin/courses/:id`: alteração de preço, regras e conteúdo programático.
- `DELETE /api/admin/courses/:id`: exclusão demonstrativa de curso.
- `POST /api/admin/courses/:id/resources`: upload de PDF, MP4, WebM ou OGV.
- `DELETE /api/admin/courses/:id/resources/:resourceId`: remoção de material.
- `POST /api/checkout/preference`: criação do pedido e tentativa de checkout.
- `GET /api/orders/:id`: leitura de um pedido autenticado.
- `GET /api/orders/resolve?external_reference=...&payment_id=...&status=...`: reconciliação do retorno do checkout.
- `GET /api/certificates/validate?code=...`: validação pública demonstrativa.

As rotas já possuem autenticação local, autorização por perfil e persistência JSON para ambiente de desenvolvimento. Pedidos, matrículas, progresso e certificados agora também ficam persistidos em `data/app-data.json`. A próxima etapa natural é migrar essa base para Supabase Auth e PostgreSQL.

## Pedidos, matrículas e progresso

- Quando o Mercado Pago não está configurado, o checkout entra em `demo_local`, aprova o pedido localmente e cria as matrículas correspondentes.
- Matrículas do aluno ficam persistidas com progresso, tentativas e melhor nota.
- A aprovação na avaliação emite um certificado com código único, já validável na rota pública.
- Compras corporativas aprovadas aumentam a base de vagas disponíveis da empresa para novas matrículas.

## Ciclo de pagamento

- Todo checkout agora cria um pedido local antes de redirecionar para o provedor.
- O retorno do checkout pode ser reconciliado pelo backend usando `external_reference` e `payment_id`.
- O webhook do Mercado Pago consulta o pagamento na API oficial, atualiza o pedido local e aplica a liberação de acesso de forma idempotente.
- Em ambiente sem Mercado Pago configurado, o pedido é aprovado localmente para manter o fluxo funcional de desenvolvimento.

## Operação corporativa

- Compras corporativas aprovadas passam a compor um saldo de vagas por curso.
- O cadastro de colaborador consome uma vaga do curso selecionado e impede alocação acima do saldo disponível.
- Cada colaborador da empresa fica persistido com vínculo de curso, progresso, status e eventual código de certificado.
- O portal da empresa passa a refletir:
  - saldo por curso (`compradas`, `alocadas`, `disponíveis`)
  - progresso real dos colaboradores vinculados
  - certificados emitidos para a equipe

## Portais internos

- Aluno: painel, cursos, biblioteca de aulas, avaliações, certificados, dados e suporte.
- Empresa: dashboard, colaboradores, compra em lote, progresso, certificados, relatórios CSV, vencimentos e configurações.
- Admin: dashboard, gerenciador completo de cursos, alunos, empresas, certificados, pagamentos, relatórios e configurações.

No gerenciador de cursos, o administrador pode cadastrar ou editar nome, código, categoria, carga horária, preço, publicação, quantidade de aulas, nota mínima, tentativas, público-alvo, objetivo e conteúdo programático. Também pode anexar PDFs e vídeos. Os arquivos demonstrativos têm limite de 12 MB cada; em produção, devem ser enviados para storage privado com controle de acesso.

A biblioteca do aluno já possui um PDF demonstrativo funcional. Os vídeos usam um player preparado para receber arquivos de storage privado ou URLs assinadas pelo backend.

## Logins demonstrativos

Todos usam a senha `123456`.

- Aluno: `aluno@teste.com`
- Empresa: `empresa@teste.com`
- Admin: `admin@teste.com`

## Onde alterar a marca

No início de `script.js`, edite `APP_CONFIG`. O nome atual é FortixSeg e o contato é `fortixseg@gmail.com`.

## Onde alterar cursos e preços

Com o servidor ativo, entre como administrador e abra **Cursos**. As alterações são gravadas em `data/courses.json`, aparecem no catálogo público quando o status é **Publicado** e também atualizam o valor usado pelo checkout.

O catálogo inicial de segurança continua em `DEFAULT_COURSE_CATALOG`, no início de `server.js`. A lista no começo de `script.js` é apenas o fallback para quando o site for aberto sem servidor.

## Integrações futuras

- Supabase Auth: substituir a autenticação JWT local por provedor externo.
- PostgreSQL: substituir a persistência JSON local de usuários, pedidos, pagamentos, matrículas e progresso.
- Mercado Pago: consultar cada pagamento recebido pelo webhook antes da liberação.
- PDF e QR Code: gerar certificados reais no servidor.
- Vídeos: usar storage protegido e controle de acesso.
- Administração: proteger as rotas com Supabase Auth, autorização por perfil e logs de auditoria.
- Logs: registrar acessos, aulas, avaliações e conclusões.

## Estrutura

```text
qualiseg/
|-- index.html
|-- styles.css
|-- script.js
|-- server.js
|-- package.json
|-- .env.example
|-- README.md
`-- assets/
```

Os números, usuários e registros atuais continuam demonstrativos até a conexão com banco de dados e autenticação real.
