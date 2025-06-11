# Frontend Estático: Consumindo API de Produtos

Este projeto frontend usa HTML, CSS e JavaScript puro para consumir uma API Django de produtos.

---

## 📦 Estrutura de Pastas

```
├── index.html
├── produto.html
├── style.css
└── script.js
```

---

## ✅ Pré-requisitos

- Servidor de API rodando em: `https://produtos.apps.robertosilva.dev/api/produtos/`
- Servidor local para servir os arquivos estáticos (recomendado: Live Server, Python HTTP server, etc.)

---

## 📄 index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Lista de Produtos</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Produtos</h1>
  <a href="produto.html">Cadastrar Produto</a>
  <ul id="lista-produtos"></ul>

  <script>
    const API_URL = 'https://produtos.apps.robertosilva.dev/api';
  </script>
  <script src="script.js"></script>
</body>
</html>
```

---

## 📄 produto.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Produto</title>
</head>
<body>
  <h1 id="form-title">Cadastrar Produto</h1>
  <form id="produto-form">
    <input type="text" name="nome" placeholder="Nome" required /><br>
    <textarea name="descricao" placeholder="Descrição"></textarea><br>
    <input type="number" name="preco" placeholder="Preço" step="0.01" required /><br>
    <button type="submit">Salvar</button>
  </form>

  <script>
    const form = document.getElementById("produto-form");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      fetch(`${API_URL}/produtos/${id}/`)
        .then(res => res.json())
        .then(produto => {
          document.querySelector("input[name=nome]").value = produto.nome;
          document.querySelector("textarea[name=descricao]").value = produto.descricao;
          document.querySelector("input[name=preco]").value = produto.preco;
          document.getElementById("form-title").textContent = "Editar Produto";
        });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));

      fetch(`${API_URL}/produtos/${id ? id + '/' : ''}`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(() => window.location.href = "index.html");
    });
  </script>
</body>
</html>
```

---

## 📄 style.css

```css
body {
  font-family: sans-serif;
  padding: 20px;
}

input, textarea {
  width: 300px;
  margin-bottom: 10px;
}
```

---

## 📄 script.js

```javascript
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
```

---

## ▶️ Como rodar

1. Coloque os arquivos em uma pasta chamada e abra o terminal nessa pasta
2. Inicie um servidor local:

```bash
# Usando Python 3
python -m http.server
```

3. Acesse `http://localhost:8000`

---

## 🏁 Conclusão

Este projeto permite listar, criar, editar e deletar produtos utilizando apenas HTML, CSS e JavaScript puro, consumindo a API Django criada anteriormente.
