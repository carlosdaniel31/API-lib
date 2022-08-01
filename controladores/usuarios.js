const conexao = require('../conexao')

const listarUsuarios = async (req, res)=>{
    try {
        const {rows: usuarios} = await conexao.query('select * from usuarios')
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const obterUsuario = async (req, res)=>{
    try {
        const {id} = req.params
        const usuario = await conexao.query('select * from usuarios where id = $1', [id])
        if(usuario.rowCount === 0){
            return res.status(404).json('Usuário não encontrado')
        }
        return res.status(200).json(usuario.rows[0])
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const cadastrarUsuario = async (req, res)=>{
    try {
        const {nome, idade, email, telefone, cpf} = req.body;

        if(!email){
            return res.status(400).json('O campo email é obrigatório')
        }
        if(!nome){
            return res.status(400).json('O campo nome é obrigatório')
        }
        if(!cpf){
            return res.status(400).json('O campo cpf é obrigatório')
        }

        const {rows: usuarios} = await conexao.query('select * from usuarios')

        for(let user of usuarios){
            if(user.email === email || user.cpf === cpf){
                return res.status(400).json('Os campos email ou cpf já existem')
            }
        }

        const novoUsuario = await conexao.query('insert into usuarios (nome, idade, email, telefone, cpf)values($1, $2, $3, $4, $5)',
        [nome, idade, email, telefone, cpf])
        if(novoUsuario.rowCount === 0){
            return res.status(400).json('Não foi possível cadastrar usuário')
        }
        return res.status(200).json('Usuário cadastrado com sucesso')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const atualizarUsuario = async (req, res)=>{
    try {
        const {nome, idade, email, telefone, cpf} = req.body;
        const {id} = req.params;

        if(!nome){
            return res.status(400).json('O campo nome é obrigatório')
        }
        if(!email){
            return res.status(400).json('O campo email é obrigatório')
        }
        if(!cpf){
            return res.status(400).json('O campo cpf é obrigatório')
        }

        const {rows: usuarios} = await conexao.query('select * from usuarios')

        for(let user of usuarios){
            if(user.email === email || user.cpf === cpf){
                return res.status(400).json('Os campos email ou cpf já existem')
            }
        }
    const updateUsuario = await conexao.query('update usuarios set nome=$1, idade=$2, email=$3, telefone=$4, cpf=$5 where id=$6', 
    [nome, idade, email, telefone, cpf, id])
    if(updateLivro.rowCount === 0){
        return res.status(400).json('Não foi possível atualizar dados do autor')
    }
    return res.status(200).json('Dados do autor atualizados')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const excluirUsuario = async (req, res)=>{
    try {
        const {id} = req.params

    const livroExcluido = await conexao.query('delete from usuarios where id = $1', [id])
    if(livroExcluido.rowCount === 0){
        return res.status(400).json('Usuário não encontrado')
    }
    return res.status(200).json('Usuário excluído')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario
}