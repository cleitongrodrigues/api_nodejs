const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {
            const sql=`select 
            prd_id, prd_nome, prd_valor, prd_unidade, ptp_id,prd_disponivel = 1 AS prd_disponivel, 
            prd_img, prd_destaque = 1 AS prd_destaque, prd_img_destaque, prd_descricao 
            from produtos where prd_disponivel=1;`
            // executa instruções SQL e armazena o resultado na variável usuários
            const produtos = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = produtos[0].length;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Produtos listados com sucesso!', 
                dados: produtos[0],
                nItens
                
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {
                // parâmetros recebidos no corpo da requisição
                const {prd_nome, prd_valor, prd_unidade, ptp_id,prd_disponivel, 
                    prd_img, prd_destaque, prd_img_destaque, prd_descricao } = request.body;
                // instrução SQL
                const sql = `INSERT INTO produtos 
                    (prd_nome, prd_valor, prd_unidade, ptp_id,prd_disponivel, 
                        prd_img, prd_destaque, prd_img_destaque, prd_descricao ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                // definição dos dados a serem inseridos em um array
                const values = [prd_nome, prd_valor, prd_unidade, ptp_id,prd_disponivel, 
                    prd_img, prd_destaque, prd_img_destaque, prd_descricao ];
                // execução da instrução sql passando os parâmetros
                const execSql = await db.query(sql, values);
                // identificação do ID do registro inserido
                const prd_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro realizado com sucesso!.', 
                dados: prd_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: error.message
            });
        }
    }, 
    async editarProdutos(request, response) {
        try {
             // parâmetros recebidos pelo corpo da requisição
             const {prd_nome, prd_valor, prd_unidade, ptp_id,prd_disponivel, 
                prd_img, prd_destaque, prd_img_destaque, prd_descricao } = request.body;
             // parâmetro recebido pela URL via params ex: /usuario/1
             const { prd_id } = request.params;
             // instruções SQL
             const sql = `UPDATE produtos 
             SET prd_nome = ?, prd_valor = ?, prd_unidade = ?, ptp_id = ?,
             prd_disponivel = ?, prd_img = ?, prd_destaque = ?,prd_img_destaque = ?,
             prd_descricao = ?
             WHERE prd_id = 16;`
             // preparo do array com dados que serão atualizados
             const values = [prd_nome, prd_valor, prd_unidade, ptp_id,prd_disponivel, 
                prd_img, prd_destaque, prd_img_destaque, prd_descricao];
             // execução e obtenção de confirmação da atualização realizada
             const atualizaDados = await db.query(sql, values);
 
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Produto ${prd_id} atualizado com sucesso!`, 
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: error.message
            });
        }
    }, 
    async apagarProdutos(request, response) {
        try {
              // parâmetro passado via url na chamada da api pelo front-end
              const { prd_id } = request.params;
              // comando de exclusão
              const sql = `DELETE FROM produtos WHERE prd_id = ?`;
              // array com parâmetros da exclusão
              const values = [prd_id];
              // executa instrução no banco de dados
              const excluir = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true, 
                mensagem: `Produto ${prd_id} excluído com sucesso`,
                dados: excluir[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: error.message
            });
        }
    }, 
}

