# Deploy na Vercel com Mercado Pago

Este pacote já tem a função serverless para Vercel em:

```text
api/checkout/preference.js
```

O front-end chama exatamente:

```text
/api/checkout/preference
```

## Variáveis necessárias na Vercel

No painel do projeto na Vercel, cadastre:

```text
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_de_teste
MERCADO_PAGO_USE_SANDBOX=true
PUBLIC_BASE_URL=https://seu-projeto.vercel.app
```

`PUBLIC_BASE_URL` pode ser preenchida depois do primeiro deploy, quando você já tiver o link público.

## Importante

Nunca coloque `MERCADO_PAGO_ACCESS_TOKEN` dentro de `index.html`, `script.js` ou qualquer arquivo público.

## Teste

Depois do deploy, adicione um curso ao carrinho e clique em **Finalizar compra**. O site deve abrir o `sandbox_init_point` do Mercado Pago.
