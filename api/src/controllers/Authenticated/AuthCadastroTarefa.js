module.exports = class AuthCadastroTarefa {
  constructor(app) {
    this.app = app;
  }

  listActionTarefa = (req, res) => {
    let query = this.app.db("tarefa");

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

  findActionTarefa = (req, res) => {
    return this.app
      .db("tarefa")
      .select()
      .where({ codigo: req.params.codigo })
      .first()
      .then((response) => {
        res.send(response);
      });
  };

  isCreateDataValidTarefa = async (data) => {
    if (data.nome == "") {
      return "Preencha todos os campos antes de salvar!";
    }
    if (data.tipo == "") {
      return `Preencha todos os campos antes de salvar!`;
    }
    return true;
  };
  createActionTarefa = async (req, res) => {
    const isCreateDataValid = await this.isCreateDataValid(req.body);
    if (isCreateDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }
    return this.app
      .db("tarefa")
      .insert({
        nome: req.body.nome,
        tipo: req.body.tipo,
      })
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: "A tarefa foi cadastrada com sucesso",
          });
        } else {
          res
            .status(500)
            .send({ result: false, message: "Falha no cadastro da tarefa" });
        }
      });
  };

  deleteActionTarefa = (req, res) => {
    return this.app
      .db("tarefa")
      .where({ codigo: req.params.codigo })
      .del()
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: `A tarefa #${req.params.codigo} foi excluída`,
          });
        } else {
          res.send({
            result: false,
            message: `A tarefa #${req.params.codigo} não foi excluída`,
          });
        }
      });
  };
};
