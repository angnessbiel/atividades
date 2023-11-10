let produtos = [];
let valorTotal = 0;

function atualizarListaProdutos() {
  const tbody = document.querySelector("#produtos-lista");
  tbody.innerHTML = "";

  produtos.forEach(produto => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>R$${produto.preco.toFixed(2)}</td>
      <td>R$${(produto.quantidade * produto.preco).toFixed(2)}</td>
      <td><button onclick="removerProduto('${produto.nome}')">Remover</button></td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelector("#produtos .total").textContent = `R$${valorTotal.toFixed(2)}`;
}

function adicionarProduto() {
  const nome = prompt("Nome do produto:");
  const quantidade = parseInt(prompt("Quantidade:"));
  const preco = parseFloat(prompt("Preço:"));

  const produto = {
    nome,
    quantidade,
    preco,
  };

  const produtoExistente = produtos.find(p => p.nome === nome);

  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
    valorTotal += quantidade * produtoExistente.preco;
  } else {
    produtos.push(produto);
    valorTotal += quantidade * preco;
  }

  atualizarListaProdutos();
}

function retirarProduto() {
  const nome = prompt("Nome do produto:");
  const quantidade = parseInt(prompt("Quantidade:"));

  if (quantidade <= 0 || isNaN(quantidade)) {
    alert("Quantidade inválida.");
    return;
  }

  const produto = produtos.find(p => p.nome === nome);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  if (quantidade >= produto.quantidade) {
    const index = produtos.indexOf(produto);
    produtos.splice(index, 1);
    valorTotal -= produto.quantidade * produto.preco;
  } else {
    produto.quantidade -= quantidade;
    valorTotal -= quantidade * produto.preco;
  }

  atualizarListaProdutos();
}

function adicionarProdutoExistente() {
  const nome = prompt("Digite o nome do produto existente:");
  const quantidadeAdicional = parseInt(prompt("Digite a quantidade adicional:"));

  if (quantidadeAdicional <= 0 || isNaN(quantidadeAdicional)) {
    alert("Quantidade adicional inválida.");
    return;
  }

  const produtoExistente = produtos.find(p => p.nome === nome);

  if (!produtoExistente) {
    alert("Produto não encontrado no sistema.");
    return;
  }

  produtoExistente.quantidade += quantidadeAdicional;
  valorTotal += quantidadeAdicional * produtoExistente.preco;
  atualizarListaProdutos();
}

function removerProduto(nome) {
  const produto = produtos.find(p => p.nome === nome);

  if (!produto) {
    alert("Produto não encontrado.");
    return;
  }

  const index = produtos.indexOf(produto);
  produtos.splice(index, 1);
  valorTotal -= produto.quantidade * produto.preco;

  atualizarListaProdutos();
}

document.querySelector("#pesquisar").addEventListener("click", pesquisarProduto);

function pesquisarProduto() {
  const nomePesquisa = prompt("Digite o nome do produto que deseja pesquisar:");
  const produtoEncontrado = produtos.find(p => p.nome === nomePesquisa);

  if (produtoEncontrado) {
    alert(`O produto ${nomePesquisa} está no sistema.`);
  } else {
    alert(`O produto ${nomePesquisa} não está no sistema.`);
  }
}

document.querySelector("#adicionarExistente").addEventListener("click", adicionarProdutoExistente);
document.querySelector("#adicionar").addEventListener("click", adicionarProduto);
document.querySelector("#retirar").addEventListener("click", retirarProduto);

valorTotal = produtos.reduce((total, produto) => total + produto.quantidade * produto.preco, 0);
document.querySelector("#produtos .total").textContent = `R$${valorTotal.toFixed(2)}`;
