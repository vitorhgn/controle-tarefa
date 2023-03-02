$(document).ready(function () {
  fetchUsersList();
  $("body").on("click", ".removeUsers", function () {
    const codigo = $(this).data("codigo");
    const confirmation = confirm("Você realmente deseja excluír esse usuário?");
    if (confirmation) {
      deleteUsers(codigo);
    }
  });
  $("#formSearchUsers").submit((event) => {
    event.preventDefault();
    fetchUsersList(event.target.searchInput.value);
  });
});

const deleteUsers = (codigo) => {
  fetch(`http://localhost:3009/auth/delete/${codigo}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      fetchUsersList();
    });
};

function fetchUsersList(searchQuery = "") {
  fetch(`http://localhost:3009/auth/users/${searchQuery}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const table = $("#UsersList tbody");
      table.html("");
      data.map((usuario, tarefa) => {
        table.append(`
            <tr>
            <td>${usuario.codigo}</td>
            <td>${usuario.nome}</td>
            <td>${tarefa.nome}</td>
            <td>${tarefa.tipo}</td>
            <td>
            <a class="removeUsers" data-codigo="${usuario.codigo}" href="#">Excluir</a>
            </td>
            </tr>
            `);
      });
    });
}
