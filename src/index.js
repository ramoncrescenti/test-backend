const { bootstrap } = require('./express');

const port = process.env.PORT ?? 3000;

bootstrap().then((_app) => {
  _app.listen(port, () => console.log(`rodando na porta ${port}`));
});
