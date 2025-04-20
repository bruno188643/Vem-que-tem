
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAvaliacao");
  const lista = document.getElementById("listaComentarios");

  function carregarAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    lista.innerHTML = "";
    avaliacoes.forEach(av => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${av.nome}</strong> (Nota: ${av.nota})<br>${av.comentario}`;
      lista.appendChild(item);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const comentario = document.getElementById("comentario").value;
    const nota = document.getElementById("nota").value;

    const novaAvaliacao = { nome, comentario, nota };
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    avaliacoes.push(novaAvaliacao);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    carregarAvaliacoes();
    form.reset();
  });

  carregarAvaliacoes();
});
