module.exports = class AuthController {
  constructor(app) {
    this.app = app;
  }
  loginAction = (req, res) => {
    const { codigo, senha } = req.body;
    if (!codigo) {
      return res
        .status(400)
        .send({ error: "O Código é um atributo obrigatório" });
    }
    if (!senha) {
      return res
        .status(400)
        .send({ error: "A Senha é um atributo obrigatório" });
    }
    let query = this.app.db("usuario");
    query.where("codigo", codigo).where("senha", senha);

    return query
      .select()
      .first()
      .then((result) => {
        if (result) {
          delete result.senha;
          return res.status(200).send(result);
        } else {
          return res.status(400).send({ error: "Usuário não encontrado" });
        }
      });
  };
};
