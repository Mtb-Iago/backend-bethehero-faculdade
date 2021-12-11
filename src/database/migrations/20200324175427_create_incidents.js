exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) { //criando as tabelas do banco
        table.increments(); //tabela principal

        table.string('title').notNullable(); //nao pode ser nula
        table.string('description').notNullable(); //nao pode ser nula
        table.decimal('value').notNullable(); //nao pode ser nula

        table.string('ong_id').notNullable(); //relacionamento

        table.foreign('ong_id').references('id').inTable('ongs'); // a coluna ong id referecia a tabela ong
    }); //apos tudo pronto * npx knex migrate:latest no cmd
};


exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};