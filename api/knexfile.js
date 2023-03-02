module.exports = {
    test: {
      client: "mysql",
      version: "5.7.31",
      connection: {
        host: "database-node",
        user: "root",
        password: "123456",
        database: "tarefas",
        port: "3306"
      },
      migrations: {
        directory: "migrations",
      },
    },
  };