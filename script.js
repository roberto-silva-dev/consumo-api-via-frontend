const lista = document.getElementById("lista-produtos");

fetch(API_URL + "/produtos/")
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${p.nome}</strong> - R$${p.preco}
        <a href="produto.html?id=${p.id}">Editar</a>
        <button onclick="deletarProduto(${p.id})">Deletar</button>
      `;
      lista.appendChild(li);
    });
  });

function deletarProduto(id) {
  fetch(`${API_URL}/produtos/${id}/`, { method: "DELETE" })
    .then(() => location.reload());
}