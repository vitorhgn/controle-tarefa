module.exports = class UserTaskController {
  constructor(app) {
    this.app = app;
  }

  listAction = (req, res) => {
    let query = this.app.db("usuario_tarefa")
                  .select(
                      [
                        'usuario_tarefa.codigo',
                        'usuario.nome as user_name',
                        'tarefa.nome as task_name',
                        'tarefa.tipo as task_type',
                      ]
                    )
                  .leftJoin("usuario","usuario_tarefa.cod_usuario", "usuario.codigo")
                  .leftJoin("tarefa","usuario_tarefa.cod_tarefa", "tarefa.codigo");

  //   let search = req.params.searchQuery;
  //   if (search) {
  //     query
  //       .where("codigo", "like", `%${search}%`)
  //       .orWhere("nome", "like", `%${search}%`)
  //   }
    return query.select().then((data) => {
      res.send(data);
    });
  };

  tasksAndUsersAvailable = async (req, res) => {
    const users = await this.app.db("usuario").select(['codigo','nome']);
    const tasksAvailable = await this.app.db("tarefa")
      .select(['tarefa.codigo','tarefa.nome'])
      .leftJoin("usuario_tarefa","tarefa.codigo", "usuario_tarefa.cod_tarefa")
      .whereNull('usuario_tarefa.codigo')

      return res.send({
          users,
          tasksAvailable
        });

  }

  isCreateDataValid = async (data) => {
    if (data.cod_usuario === undefined || data.cod_usuario == "") {
      return "Preencha o usuário antes de salvar!";
    }
    if (data.cod_tarefa === undefined || data.cod_tarefa == "") {
      return "Preencha a tarefa antes de salvar!";
    }
    const userExists = await this.app.db("usuario")
    .select()
    .where({
      codigo: data.cod_usuario
    })
    .first();
    if(!userExists){
      return `Usuário informado é inválido`
    }
    const taskExists = await this.app.db("tarefa")
    .select()
    .where({
      codigo: data.cod_tarefa
    })
    .first();
    if(!taskExists){
      return `Tarefa informada é inválida`
    }
    const userTaskExists = await this.app.db("usuario_tarefa")
    .select()
    .where({
      cod_tarefa: data.cod_tarefa
    })
    .first();
    if(userTaskExists){
      return `A tarefa já foi adicionada à um usuário!`
    }
    return true;
  };
  createAction = async (req, res) => {
    const isCreateDataValid = await this.isCreateDataValid(req.body);
    if (isCreateDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }
    return this.app
      .db("usuario_tarefa")
      .insert({
        cod_usuario: req.body.cod_usuario,
        cod_tarefa: req.body.cod_tarefa
      })
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: "A tarefa foi adicionada com sucesso",
          });
        } else {
          res
            .status(500)
            .send({ result: false, message: "Falha ao adicionar tarefa" });
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
      .db("usuario_tarefa")
      .where({ codigo: codigo })
      .del()
      .then((response) => {
        if (response) {
          res.send({
            result: true,
            message: `A tarefa #${codigo} foi excluída do usuário`,
          });
        } else {
          res.send({
            result: false,
            message: `A tarefa #${codigo} do usuário não foi encontrada no sistema`,
          });
        }
      });
  };
};
