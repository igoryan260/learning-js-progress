//primeira função JS é:
/* após clicar no botão  "PLUS", deverá: 

- abrir uma janela onde o usuário poderá inlcuir uma nova tarefa

- excluir o aviso 'warning' de que não existe tarefa nenhuma

- trocar o ícone de add task ou delete task

-adicionar um valor booleano para detectar cliques simultânios, para sempre inverter valores das classes e imagens do ícone
*/


function abrirJanelaAddTask() {
    var btn_add_delete_task = document.getElementById("btn-add-or-delete-task").className

    console.log(btn_add_delete_task)
    if (btn_add_delete_task === "add-task") {

        document.getElementById("btn-add-or-delete-task").className = "delete-task"
        document.getElementById("image-add-or-delete-task").src = "./image/close-add-task.png"
        document.getElementById("p-warning-no-task").className = "d-none"
        document.getElementById("window-new-task").className = ""

    } else if (btn_add_delete_task === "delete-task") {

        document.getElementById("btn-add-or-delete-task").className = "add-task"
        document.getElementById("image-add-or-delete-task").src = "./image/plus.png"
        document.getElementById("p-warning-no-task").className = ""
        document.getElementById("window-new-task").className = "d-none"

    }
}


/*criando array para armazenar os valores inseridos pelo usuário no titulo da tarefa e na descrição também,*/

var topicosInseridosTitulo = Array()
var topicosInseridosDescricao = Array()

/*contador para passar pelos indices do array*/
var passandoPeloArray = 0

function inserindoTopicosArray() {
    topicosInseridosTitulo.push(document.getElementById("title-topic").value)
    console.log(topicosInseridosTitulo)

    /*chamando a funcao adicionarTituloNaLista*/
    adicionarTituloNaLista(passandoPeloArray)

    /*adicionar os titulos que estão armazenados no array, e inserir na lista não ordenada na parte lateral direita azul*/
    function adicionarTituloNaLista(indiceArray) {

        var itemArrayTitulo = document.createElement("li")
        itemArrayTitulo.style = "cursor: pointer;"
        itemArrayTitulo.id = "titulo-" + indiceArray + ""
        itemArrayTitulo.onclick = quandoClicar
        itemArrayTitulo.innerHTML = topicosInseridosTitulo[indiceArray]

        document.getElementById("list-added-tasks").appendChild(itemArrayTitulo)
    }
    passandoPeloArray++


    /***************************************************************************************** ======================================================================================*/


    /*a função abaixo irá repetir o mesmo processo, mas irá adicionar a descrição no ArrayDescricao*/
    /* mas não irá colocar na divisão azul */
    topicosInseridosDescricao.push(document.getElementById("description-task").value)

    /*debug*/
    console.log(topicosInseridosDescricao)

    /*limpar os valores preenchidos nos inputs*/
    document.getElementById("title-topic").value = ""
    document.getElementById("description-task").value = ""
}


/*função para abrir uma div contendo os conteúdos relacionado à tarefa,
exemplo: cliquei no topico tal, abrirá uma div com titulo e descrição em baixo*/

function abrirExpendedTopic(indiceTitulo) {
    /*esete código vai procurar o elemento com o id 'expended-topi' e vai excluir, caso não exista ele irá adicionar uma nova div*/
    if (document.getElementById("expended-topic")) {
        document.getElementById("expended-topic").remove()
    }

    var tituloDoTopico = topicosInseridosTitulo[indiceArray]
    var descricaoDoTopico = document.getElementById("description-task").value

    /*criando a div automaticamente*/

    var divExpendedTopic = document.createElement("div")

    divExpendedTopic.id = "expended-topic"
    divExpendedTopic.className = "classe-expended-topic d-flex"

    var conteudoDaDiv = "<h3>" + tituloDoTopico + "</h3><p>" + descricaoDoTopico + "</p><button type='button' id='close-expended-topic'>Close</button>"

    divExpendedTopic.innerHTML = conteudoDaDiv

    document.getElementById("window-new-task").appendChild(divExpendedTopic)

    /*debugando*/
    console.log("Estou chegando até aqui")
}