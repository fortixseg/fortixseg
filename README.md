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
OPENAI_API_KEY=SUA_CHAVE
OPENAI_MODEL=gpt-5.4-mini
```

## Mercado Pago

O botão **Finalizar compra** envia cursos, pacotes, quantidades e valores calculados ao servidor demonstrativo. O servidor cria uma preferência do Checkout Pro e redireciona o cliente ao Mercado Pago. Em produção, os preços devem ser recalculados no backend antes de criar a cobrança.

O arquivo `.env` com a chave real não deve ser enviado junto do site nem colocado dentro de `index.html`, `script.js` ou `styles.css`. Ao subir em um servidor de teste, cadastre `MERCADO_PAGO_ACCESS_TOKEN` como variável de ambiente privada no painel da hospedagem. O ZIP de entrega inclui `.env.example`, mas deixa `.env` de fora por segurança.

### Netlify

O projeto inclui `netlify.toml` e a função `netlify/functions/checkout-preference.cjs`. Para o checkout funcionar no Netlify:

1. Suba a pasta completa do projeto, incluindo `assets`, `data`, `netlify`, `netlify.toml`, `index.html`, `styles.css` e `script.js`.
2. No painel do Netlify, abra **Site configuration > Environment variables**.
3. Cadastre `MERCADO_PAGO_ACCESS_TOKEN` com o token de teste do Mercado Pago.
4. Cadastre `MERCADO_PAGO_USE_SANDBOX=true`.
5. Faça um novo deploy depois de salvar as variáveis.

Se o site for publicado apenas como página estática sem a função do Netlify ativa, o botão de checkout vai mostrar erro. Isso é esperado, porque a chave do Mercado Pago não pode ficar no navegador.

Depois do deploy, confira no painel do Netlify se existe uma função chamada `checkout-preference`. Se ela não aparecer em **Functions**, o site foi publicado só como estático. Nesse caso, faça o deploy conectando a pasta a um repositório GitHub ou usando Netlify CLI, para que a pasta `netlify/functions` seja processada.

Para publicar:

- Defina `PUBLIC_BASE_URL` com o domínio público HTTPS, sem `localhost`.
- Cadastre `/api/mercado-pago/webhook` como URL de notificação.
- Use credenciais e usuários de teste antes de mudar para produção.
- Confirme o status do pagamento no servidor antes de matricular ou liberar qualquer curso.

O webhook já valida a assinatura secreta. A gravação da ordem, consulta final do pagamento, idempotência e matrícula estão marcadas como próximas etapas em `server.js`.

## Atendente com IA

Com `OPENAI_API_KEY` configurada, o chat chama a Responses API pelo servidor. A chave nunca chega ao navegador. Se a API estiver desligada ou indisponível, o atendente continua respondendo com a base local já existente.

O modelo pode ser alterado em `OPENAI_MODEL`. O padrão é `gpt-5.4-mini`, escolhido para equilibrar qualidade, velocidade e custo.

## APIs demonstrativas da plataforma

As áreas internas tentam carregar dados pelo servidor e usam o modo local como fallback:

- `POST /api/auth/demo`: login dos perfis demonstrativos.
- `GET /api/courses`: catálogo e preços usados pelo front-end.
- `GET /api/student/dashboard`: métricas e próximas ações do aluno.
- `GET /api/student/library`: vídeos, PDFs e metadados da biblioteca do curso.
- `GET /api/company/dashboard`: métricas, alertas e colaboradores da empresa.
- `POST /api/company/employees`: cadastro demonstrativo de colaborador.
- `GET /api/admin/dashboard`: métricas, integrações, alunos e pagamentos recentes.
- `GET /api/admin/courses`: catálogo completo, incluindo rascunhos e materiais.
- `POST /api/admin/courses`: cadastro de um novo curso.
- `PUT /api/admin/courses/:id`: alteração de preço, regras e conteúdo programático.
- `DELETE /api/admin/courses/:id`: exclusão demonstrativa de curso.
- `POST /api/admin/courses/:id/resources`: upload de PDF, MP4, WebM ou OGV.
- `DELETE /api/admin/courses/:id/resources/:resourceId`: remoção de material.
- `GET /api/certificates/validate?code=...`: validação pública demonstrativa.

Essas rotas ainda não substituem autenticação, autorização e persistência reais. Elas definem o contrato inicial para a futura conexão com Supabase e PostgreSQL.

## Portais internos

- Aluno: painel, cursos, biblioteca de aulas, avaliações, certificados, dados e suporte.
- Empresa: dashboard, colaboradores, compra em lote, progresso, certificados, relatórios CSV, vencimentos e configurações.
- Admin: dashboard, gerenciador completo de cursos, alunos, empresas, certificados, pagamentos, relatórios e configurações.

Nos três portais, o cabeçalho e o rodapé públicos são ocultados. O botão de três barras no canto superior esquerdo abre a navegação lateral; ao escolher uma área, o menu fecha automaticamente. O dashboard da empresa possui gráficos interativos para alternar o período e consultar conformidade, situação da equipe e matrículas por curso.

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

O catálogo inicial de segurança continua em `DEFAULT_COURSE_CATALOG`, no início de `server.js`. A lista no começo de `script.js` é apenas o fallback para quando o site for aberto sem servidor. O catálogo ampliado do front fica em `courseCatalogRows`, dentro de `script.js`.

## Onde alterar pacotes empresariais

No `script.js`, edite:

- `trainingPackages`: nome, preço por colaborador, carga horária, selo e cursos inclusos.
- `discountTiers`: descontos por quantidade de colaboradores.
- `courseCatalogRows`: cursos individuais, categorias, horas e preços.

As empresas atendidas e avaliações públicas estão no `index.html`, nas seções **Empresas atendidas** e **Avaliações dos alunos**.

## Integrações futuras

- Supabase Auth: substituir `handleLogin()` e `handleRegister()`.
- PostgreSQL: armazenar usuários, pedidos, pagamentos, matrículas e progresso.
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
