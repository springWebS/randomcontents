import express from 'express';
import { processarMensagem } from './funcoes.js';
import { WebSocketServer } from 'ws'; // <-- importa ws

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.listen(4000, () => console.log("Servidor rodando na porta 4000"))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.post('/enviar', (req, res) => {
  const msgRecebida = req.body.msg;
  console.log('Servidor recebeu via POST:', msgRecebida);
  const resposta = processarMensagem(msgRecebida);
  res.json({ resposta });
});

app.ld
// ------------------ WEBSOCKET ------------------

// Cria servidor WebSocket na porta 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
  console.log('Novo cliente conectado');

  ws.on('message', msg => {
    console.log('Mensagem recebida via WS:', msg);

    // envia pra todos os clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(msg); // 1 = OPEN
    });
  });
});
