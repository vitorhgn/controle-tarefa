$(document).ready(function () {

    $("#usersForm").submit((event) => {
      event.preventDefault();
      const body = {
        codigo: $(this).find("#codigoUsers").val(),
        nome: $(this).find("#nomeUsers").val(),
        nome: $(this).find("#nomeTarefa").val(),
        tipo: $(this).find("#tipoUsers").val(),
      };
  
      let methodEndPoint;
      let urlEndPoint;
  
        methodEndPoint = "POST";
        urlEndPoint = "http://localhost:3009/auth/users/save";
      
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
            document.location.href = "/auth/users";
          }
        });
    });
  });
  
  function fetchStudent() {
    fetch(`http://localhost:3009/auth/users/find/${getCodigoFromURL()}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const usersForm = $("#usersForm");
        usersForm.find("#codigoUsers").val(data.codigo);
        usersForm.find("#nomeUsers").val(data.nome);
        usersForm.find("#nomeTarefa").val(data.nome);
        usersForm.find("#tipoUsers").val(data.tipo);
        console.log(data);
      });
  }
  function getCodigoFromURL() {
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.get("codigo");
  }
  