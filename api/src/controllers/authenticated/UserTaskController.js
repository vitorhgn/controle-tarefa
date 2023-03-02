module.exports = class UserTaskController {
    constructor(app) {
      this.app = app;
    }
  
    listAction = (req, res) => {
      let query = this.app.db("usuario_tarefa");
  
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
  };
  