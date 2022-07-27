let contador2 = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');


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

function deletar(id) {
  var tarefa = document.getElementById(id);
  tarefa.remove();
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

  } else {
    item.classList.remove('clicado');

    var icone = document.getElementById('icone_' + id)

    icone.classList.remove('mdi-checkbox-marked-circle');

    icone.classList.add('mdi-circle-outline');

  }
}

input.addEventListener("keyup", function (event) {
  //SE TECLOU ENTER (13)
  if (event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
  }
})