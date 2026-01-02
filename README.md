# Circo Rosa — Site de Aniversário (Clarice 1 ano)

Site simples e responsivo para confirmar presença (RSVP) e ver sugestões de presentes.

Rodar localmente (Windows / cmd.exe):

1. Instale o Node.js (versão LTS recomendada).
2. Abra o terminal (cmd) na pasta do projeto e rode:

```
npm install
npm start
```

3. Abra http://localhost:3000 no navegador.

O servidor serve os arquivos estáticos e expõe a API:
- `POST /api/rsvp` — aceita JSON: `{ name, email, guests, message }` e salva em `data/rsvps.json`.
- `GET /api/rsvps` — lista confirmações (útil para o host verificar convidados).

Deploy: você pode implantar como site estático (por exemplo, GitHub Pages) e usar um serviço de formulário/serverless para processar RSVPs, ou implantar o `server.js` em um host Node (Heroku, Vercel serverless, Render, etc.).

Substitua imagens e textos conforme necessário (por exemplo, local/data/hora reais).
