const knex = require('knex');
const configuration = require('../../knexfile'); // buscando o conf para o BD

const connection = knex(configuration.development); //conexao de desenvolvimento

module.exports = connection; // exporta o connection