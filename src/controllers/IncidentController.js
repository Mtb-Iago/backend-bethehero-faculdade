const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        
        const [count] = await connection('incidents')
        .count(); //função para contar o total de itens
        console.log(count);
        const { page = 1 } = request.query; //buscar dados da pagina 1

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //compara os ids para e trazendo os dados do incidente
            .limit(5) //esquema de paginazação limita 5 itens por pagina
            .offset((page - 1) * 5)
            .select('incidents.*', //incidents pega todos os dados, porem de ongs busca os listados
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            );

        response.header('x-total-count', count['count(*)']); //mostra quantos intes tem cadastrados

        return response.json(incidents);
    },
    async create(request, response) {
        const { title, description, value, ong_id } = request.body; //tipo os parametros do construtor

        const [id] = await connection('incidents').insert({ //inseri no banco de dados
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params; //router paraments
        const ong_id = request.headers.authorization; //busca o id de autorização no postman

        const incidents = await connection('incidents') //busca no bd
            .where('id', id)
            .select('ong_id')
            .first(); //retorna apenas 1 

        if (incidents.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' }); //codigo http nao autorizado
        }

        await connection('incidents').where('id', id).delete(); //deleta os dados

        return response.status(204).send(); //retorna uma resposta sem conteudo para o front. //send envia sem mostrar
    }
}