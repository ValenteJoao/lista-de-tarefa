let contador = localStorage.length;
let contador2 = localStorage.length;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');

function setMain() {

  let control = 1
  if (localStorage.length !== 0) {
    var chave = JSON.stringify(localStorage);
    const meuvetor = chave.split(",");
    var i = 0;
    var maior = 0;
    while (i < meuvetor.length) {
      const palavra = meuvetor[i];
      let numero = 0
      if (i == 0) {
        numero = palavra[2];
      }
      else {
        numero = palavra[1];
      }
      if (numero > maior)
        maior = numero;
      ++i
    }
    while (control <= maior) {
      if (localStorage.getItem(control) !== null) {
        let newitem = localStorage.getItem(control)
        let nwitem = `<div id="${control}" class="item">
      <div onclick="marcarTarefa(${control})" class="item-icone">
        <i id="icone_${control}"class=" mdi mdi-circle-outline">
        </i>
      </div>
      <div onclick="marcarTarefa(${control})" class="item-nome">
        ${newitem}
      </div>
      <div class="item-botao">
        <button onclick="deletar(${control})" class="delete"><i class="mdi mdi-delete"></i>Excluir</button>
      </div>
    </div>`

        main.innerHTML += nwitem;

      }
      ++control
    }
  }
}

function addTarefa() {

  //Pegar o valor digitado do input
  let valorInput = input.value;
  //Se náo for vazio, nem nulo, nem indefinido
  if ((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined));

  ++contador2;
  ++contador;
  localStorage.setItem(contador, valorInput);

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

  // ADD NOVO ITEM NO MAIN
  main.innerHTML += novoItem;

  //ZERAR O CAMPO DO INPUT
  input.value = "";
  input.focus();
}

function deletar(id) {
  var tarefa = document.getElementById(id);
  tarefa.remove();
  localStorage.removeItem(id);
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