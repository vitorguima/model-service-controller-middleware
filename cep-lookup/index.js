const express = require('express');

const app = express();

app.use(express.json())

const cors = require('cors');

const PingController = require('./controllers/PingController');

const CepController = require('./controllers/CepController');

app.use(cors());

app.use('/ping', PingController);

app.use('/cep', CepController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
