module.exports = class AuthCadastroUsuario {
  constructor(app) {
    this.app = app;
  }

  listActionUsuario = (req, res) => {
    let query = this.app.db("usuario");

    let search = req.params.searchQuery;
    if (search) {
      query
        .where("codigo", "like", `%${search}%`)
        .orWhere("nome", "like", `%${search}%`);
    }
    return query.select().then((data) => {
      res.send(data);
    });
  };

  findActionUsuario = (req, res) => {
    return this.app
      .db("usuario")
      .select()
      .where({ codigo: req.params.codigo })
      .first()
      .then((response) => {
        res.send(response);
      });
  };

  isCreateDataValidUsuario = async (data) => {
    if (data.nome == "") {
      return "Preencha todos os campos antes de salvar!";
    }
    if (data.senha == "") {
      return `Preencha todos os campos antes de salvar!`;
    }
    return true;
  };
  createActionUsuario = async (req, res) => {
    const isCreateDataValid = await this.isCreateDataValid(req.body);
    if (isCreateDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }
    return this.app
      .db("usuario")
      .insert({
        nome: req.body.name,
        senha: req.body.senha,
        direito: req.body.direito,
      })
      .then((response) => {
        if (response) {
          res.send({ result: true, message: "Usuário cadastrado com sucesso" });
        } else {
          res
            .status(500)
            .send({ result: false, message: "Falha no cadastro do usuário" });
        }
      });
  };

  deleteActionUsuario = (req, res) => {
    return this.app
      .db("usuario")
      .where({ codigo: req.params.codigo })
      .del()
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: `O usuário #${req.params.nome} foi excluído`,
          });
        } else {
          res.send({
            result: false,
            message: `O usuário #${req.params.nome} não foi excluído`,
          });
        }
      });
  };
};
