# Como corrigir o checkout no Netlify

O erro "A função de checkout não foi publicada no Netlify" significa que o Netlify publicou apenas a parte visual do site. Para o Mercado Pago funcionar, o deploy precisa incluir também a função:

```text
netlify/functions/checkout-preference.cjs
```

## Caminho recomendado: publicar pelo GitHub

1. Extraia o ZIP do projeto.
2. Crie um repositório no GitHub.
3. Envie todos os arquivos do projeto para esse repositório, incluindo:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets`
   - `data`
   - `netlify`
   - `netlify.toml`
4. No Netlify, vá em **Add new site > Import an existing project**.
5. Escolha o repositório do GitHub.
6. Nas configurações de build:
   - **Build command**: deixe vazio
   - **Publish directory**: `.`
7. Em **Site configuration > Environment variables**, adicione:

```text
MERCADO_PAGO_ACCESS_TOKEN=seu_token_de_teste
MERCADO_PAGO_USE_SANDBOX=true
```

8. Faça o deploy.
9. No painel do Netlify, abra **Functions** e confira se aparece:

```text
checkout-preference
```

Se essa função aparecer, o botão de finalizar compra já deve abrir o checkout do Mercado Pago.

## Importante

Não coloque o token do Mercado Pago dentro de `index.html`, `script.js` ou qualquer arquivo público. Ele precisa ficar somente nas variáveis de ambiente do Netlify.

Deploy por arrastar e soltar pode publicar só o site estático e deixar a função de fora. Para checkout real, prefira GitHub ou Netlify CLI.

