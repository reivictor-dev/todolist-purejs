const inputValor = document.querySelector('.contentElement');
const newTaskBtn = document.querySelector('.newTaskBtn');
const ulTarefas = document.querySelector('.tarefas')


const validarInput = () => {
    if (!inputValor.value) {
        alert('Escreva uma tarefa!');

    } else {
        criaTarefa(inputValor.value)
        salvarTarefas()
    }
}

const criaTarefa = (tarefa) => {

    let criaLi = document.createElement('li')
    let criaBtn = document.createElement('button')
    criaLi.classList.add('li-js')

    let LiCriada = ulTarefas.appendChild(criaLi)
    LiCriada.innerHTML = tarefa

    LiCriada.appendChild(criaBtn).innerHTML = '⊗'
    criaBtn.classList.add('btn-js')
    let btnClass = document.querySelector('.btn-js')
}

const focarNoInput = () => { 
    inputValor.value = '';
    inputValor.focus();
}

const novaTarefa = () => {
    validarInput()
}
///////////////////////////*ADD TAREFAS*/////////////////////// */
//eventos de criar tarefa:
newTaskBtn.addEventListener("click", () => { //com click
    novaTarefa()
    focarNoInput()
}) 

inputValor.addEventListener("keypress", function(e){ //com enter
    if(e.keyCode === 13) { //keycode é o codigo da tecla que achamos quando clicamos com o teclado usando 'console.log(e)' capturado pelo keypress
        novaTarefa();
        focarNoInput();
    }
})
///////////////////////////*FIM ADD TAREFAS*/////////////////////// */

//adicionando a função apagar para o botao.
document.addEventListener('click', function (e) {
    const el = e.target
    if (el.classList.contains('btn-js')) {
        el.parentElement.remove(); //ve quem é o pai do elemento e o remove ao clica-lo
        salvarTarefas(); //vai remover as tarefas do localStorage tambem.
    }
})

function salvarTarefas() {
    const liTarefas = ulTarefas.querySelectorAll('.li-js');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas ) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('⊗', '').trim();
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); //convertando para JSON

    localStorage.setItem('tarefas', tarefasJSON); //colocando as tarefas em JSON no localStorage
}

const adicionaTarefasSalvas = () => {
    const tarefas = localStorage.getItem('tarefas'); //pegando as tarefas em JSON no localStorage
    const listaDeTarefas = JSON.parse(tarefas); //convertendo de volta para array

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();