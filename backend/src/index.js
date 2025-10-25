require('dotenv').config();
const app = require('./app');
const { sequelize, Counter } = require('./models');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();
  // Ensure the table exists and initial record
  await sequelize.sync();
  const found = await Counter.findByPk(1);
  if (!found) {
    await Counter.create({ id: 1, valor: 0 });
  }

  // Crear servidor HTTP y socket.io
  const server = http.createServer(app);
  const io = socketio(server, {
    cors: {
      origin: ['http://hp-pavilion-1:8000', 'http://localhost:8000', 'http://127.0.0.1:8000'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Exponer io en app.locals para usarlo en rutas
  app.locals.io = io;

  io.on('connection', (socket) => {
    // Enviar el valor actual al conectar
    Counter.findByPk(1).then(c => {
      if (c) socket.emit('counter:update', { valor: c.valor });
    });
    // Opcional: log de conexión
    console.log('Socket conectado:', socket.id);
  });

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
