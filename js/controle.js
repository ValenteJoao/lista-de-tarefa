let contador2 = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');

verificaTarefaSalva();

function verificaTarefaSalva() {
  if (localStorage.getItem("tarefa") != []) {
    let tarefas = localStorage.getItem("tarefa");
    let listaDeTarefas = JSON.parse(tarefas);
    for (let tarefasNovas of listaDeTarefas) {
      addTarefaSalva(tarefasNovas)
    }
  }
}

function addTarefaSalva(tarefa) {

  ++contador2;

  let novoItem = tarefa;

  main.innerHTML += novoItem;
}

function addTarefa() {
  let valorInput = input.value;

  if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)) {
    ++contador2;

    let novoItem = `<div id="${contador2}" class="item">
      <div onclick="marcarTarefa(${contador2})" class="item-icone">
      <i id="icone_${contador2}"class=" mdi mdi-circle-outline">
      </i>
      </div>
      <div onclick="marcarTarefa(${contador2})" class="item-nome">
      ${valorInput}
      </div>
      <div class="item-botao">
      <button onclick="deletar(${contador2})" class="delete"><i class="mdi mdi-delete"></i>Excluir</button>
      </div>
      </div>`;

    main.innerHTML += novoItem;
    input.value = "";
    input.focus();
  }
}

function salvarDados() {
  let dadosDiv = document.querySelectorAll('#areaLista')
  const dados = [];

  for (let tarefa of dadosDiv) {
    tarefaTexto = tarefa.innerHTML;
    dados.push(tarefaTexto);
  }

  const salvarJson = JSON.stringify(dados);
  salvarDadoLocal(salvarJson);
}

function salvarDadoLocal(valor) {
  localStorage.setItem('tarefa', valor);

}

function deletar(id) {
  var tarefa = document.getElementById(id);
  tarefa.remove();
  salvarDados()
}

function marcarTarefa(id) {
  var item = document.getElementById(id);
  var classe = item.getAttribute('class');

  if (classe == "item") {
    item.classList.add('clicado');
    var icone = document.getElementById('icone_' + id)

    icone.classList.remove('mdi-circle-outline');

    icone.classList.add('mdi-checkbox-marked-circle');

    item.parentNode.appendChild(item);
    salvarDados()

  } else {
    item.classList.remove('clicado');

    var icone = document.getElementById('icone_' + id)

    icone.classList.remove('mdi-checkbox-marked-circle');

    icone.classList.add('mdi-circle-outline');
    
    salvarDados()

  }
}

input.addEventListener("keyup", function (event) {
  //SE TECLOU ENTER (13)
  if (event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
    salvarDados()
  }
})

btnAdd.addEventListener("click", () => {
  addTarefa()
  salvarDados()
})