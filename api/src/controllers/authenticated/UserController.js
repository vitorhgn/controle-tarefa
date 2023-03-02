module.exports = class UserController {
  constructor(app) {
    this.app = app;
  }

  listAction = (req, res) => {
    let query = this.app.db("usuario");

    let search = req.params.searchQuery;
    if (search) {
      query
        .where("codigo", "like", `%${search}%`)
        .orWhere("nome", "like", `%${search}%`)
    }
    return query.select().then((data) => {
      res.send(data);
    });
  };

  findAction = (req, res) => {
    const { codigo } = req.params
    if (!codigo) {
      return res
        .status(400)
        .send({ error: "O Código é um atributo obrigatório" });
    }
    return this.app
      .db("usuario")
      .select()
      .where({ codigo: codigo })
      .first()
      .then((response) => {
        if (response) {
          return res.status(200).send(response);
        } else {
          return res.status(400).send({ error: "usuario não encontrado" });
        }
      });
  };

  isCreateDataValid = (data) => {
    if (data.nome === undefined || data.nome == "") {
      return "Preencha o nome antes de salvar!";
    }
    if (data.direito === undefined || data.direito == "") {
      return `Preencha o direito antes de salvar!`;
    }
    if(!['S', 'O'].includes(data.direito)) {
      return 'Desculpa, mas o direito de usuario informado é inválido!'
    }
    if(data.senha === undefined || data.senha == ""){
      return "Preencha a senha antes de salvar!";
    }
    return true;
  };
  createAction = async (req, res) => {
    const isCreateDataValid = this.isCreateDataValid(req.body);
    if (isCreateDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }
    return this.app
      .db("usuario")
      .insert({
        nome: req.body.nome,
        senha: req.body.senha,
        direito: req.body.direito,
      })
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: "O usuário foi cadastrado com sucesso",
          });
        } else {
          res
            .status(500)
            .send({ result: false, message: "Falha no cadastro do usuário" });
        }
      });
  };

  deleteAction = (req, res) => {
    const { codigo } = req.params
    if (!codigo) {
      return res
        .status(400)
        .send({ error: "O Código é um atributo obrigatório" });
    }
    return this.app
      .db("usuario")
      .where({ codigo: codigo })
      .del()
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: `O usuário #${codigo} foi excluído`,
          });
        } else {
          res.send({
            result: false,
            message: `O usuário #${codigo} não foi encontrada no sistema`,
          });
        }
      });
  };
};
