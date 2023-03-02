$(document).ready(function () {

  $("#tarefaForm").submit((event) => {
    event.preventDefault();
    const body = {
      codigo: $(this).find("#codigoTarefa").val(),
      nome: $(this).find("#nomeTarefa").val(),
      tipo: $(this).find("#tipoTarefa").val(),
    };

    let methodEndPoint;
    let urlEndPoint;

      methodEndPoint = "POST";
      urlEndPoint = "http://localhost:3009/auth/tarefas/save";
    
    console.log(urlEndPoint, methodEndPoint);
    fetch(urlEndPoint, {
      method: methodEndPoint,
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        if (data.result == true) {
          document.location.href = "/auth/tarefas";
        }
      });
  });
});

function fetchStudent() {
  fetch(`http://localhost:3009/auth/tarefas/find/${getCodigoFromURL()}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const tarefaForm = $("#tarefaForm");
      tarefaForm.find("#codigoTarefa").val(data.codigo);
      tarefaForm.find("#nomeTarefa").val(data.nome);
      tarefaForm.find("#tipoTarefa").val(data.tipo);
      console.log(data);
    });
}
function getCodigoFromURL() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.get("codigo");
}
