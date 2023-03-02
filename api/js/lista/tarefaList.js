$(document).ready(function () {
  fetchTarefasList();
  $("body").on("click", ".removeTarefas", function () {
    const codigo = $(this).data("codigo");
    const confirmation = confirm("Você realmente deseja excluír essa tarefa?");
    if (confirmation) {
      deleteTarefas(codigo);
    }
  });
  $("#formSearchTarefas").submit((event) => {
    event.preventDefault();
    fetchTarefasList(event.target.searchInput.value);
  });
});

const deleteTarefas = (codigo) => {
  fetch(`http://localhost:3009/auth/tarefas/delete/${codigo}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      fetchTarefasList();
    });
};

function fetchTarefasList(searchQuery = "") {
  fetch(`http://localhost:3009/auth/tarefas/find/${searchQuery}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const table = $("#tarefasList tbody");
      table.html("");
      data.map((tarefa) => {
        table.append(`
            <tr>
            <td>${tarefa.codigo}</td>
            <td>${tarefa.nome}</td>
            <td>${tarefa.tipo}</td>
            <td>
            <a class="removeTarefas" data-codigo="${tarefa.codigo}" href="#">Excluir</a>
            </td>
            </tr>
            `);
      });
    });
}
