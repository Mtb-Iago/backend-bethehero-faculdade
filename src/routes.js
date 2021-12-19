const express = require('express'); //importando o express para o routes

const OngController = require('./controllers/OngController'); //importa o arquivo
const IncidentController = require('./controllers/IncidentController'); //importa o arquivo
const routes = express.Router(); //desacoplando o modo de rotas em uma nova variavel

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); //manda para controller.

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes; //exporta tudo que esta em  variavel routes