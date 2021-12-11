exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table) { //criando as tabelas do banco
        table.string('id').primary(); //tabela principal
        table.string('name').notNullable();
        table.string('email').notNullable(); //nao pode ser nula
        table.string('whatsapp').notNullable(); //nao pode ser nula
        table.string('city').notNullable(); //nao pode ser nula
        table.string('uf', 2).notNullable(); //nao pode ser nula, e contera apenas 2 char
    }); //apos tudo pronto * npx knex migrate:latest no cmd
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};