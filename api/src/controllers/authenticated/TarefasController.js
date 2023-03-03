module.exports = class TarefasController {
  constructor(app) {
    this.app = app;
  }

  listAction = (req, res) => {
    let query = this.app.db("tarefa");

    let search = req.params.searchQuery;
    if (search) {
      query
        .where("codigo", "like", `%${search}%`)
        .orWhere("nome", "like", `%${search}%`)
        .orWhere("tipo", "like", `${search}`);
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
      .db("tarefa")
      .select()
      .where({ codigo: codigo })
      .first()
      .then((response) => {
        if (response) {
          return res.status(200).send(response);
        } else {
          return res.status(400).send({ error: "Tarefa não encontrada" });
        }
      });
  };

  isCreateDataValid = (data) => {
    if (data.nome === undefined || data.nome == "") {
      return "Preencha o nome antes de salvar!";
    }
    if (data.tipo === undefined || data.tipo == "") {
      return `Preencha o tipo antes de salvar!`;
    }
    if(!['D', 'M', 'S', 'Q'].includes(data.tipo)) {
      return 'Desculpa, mas o tipo de tarefa informado é inválido!'
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

  deleteAction = (req, res) => {
    const { codigo } = req.params
    if (!codigo) {
      return res
        .status(400)
        .send({ error: "O Código é um atributo obrigatório" });
    }
    return this.app
      .db("tarefa")
      .where({ codigo: codigo })
      .del()
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: `A tarefa #${codigo} foi excluída`,
          });
        } else {
          res.send({
            result: false,
            message: `A tarefa #${codigo} não foi encontrada no sistema`,
          });
        }
      });
  };
};
