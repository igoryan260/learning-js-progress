//primeira função JS é:
/* após clicar no botão  "PLUS", deverá: 

- abrir uma janela onde o usuário poderá inlcuir uma nova tarefa

- excluir o aviso 'warning' de que não existe tarefa nenhuma

- trocar o ícone de add task ou delete task

-adicionar um valor booleano para detectar cliques simultânios, para sempre inverter valores das classes e imagens do ícone
*/


function abrirJanelaAddTask() {
    var btn_add_delete_task = document.getElementById("btn-add-or-delete-task").className

    //console.log(btn_add_delete_task)
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
        // console.log(topicosInseridosTitulo)

    /*chamando a funcao adicionarTituloNaLista*/
    adicionarTituloNaLista(passandoPeloArray)

    /*adicionar os titulos que estão armazenados no array, e inserir na lista não ordenada na parte lateral direita azul*/
    function adicionarTituloNaLista(indiceArray) {

        var itemArrayTitulo = document.createElement("li")
        itemArrayTitulo.style = "cursor: pointer;"
        itemArrayTitulo.id = "titulo-" + indiceArray + ""

        itemArrayTitulo.innerHTML = topicosInseridosTitulo[indiceArray]

        document.getElementById("list-added-tasks").appendChild(itemArrayTitulo)

        /*quando o objeto da lista for clicado, irá executar a função que abrirá a funcao abrirExpendedTopic*/
        itemArrayTitulo.addEventListener("click", function() {
            abrirExpendedTopic(indiceArray)
        })
    }
    passandoPeloArray++


    /***************************************************************************************** ======================================================================================*/


    /*a função abaixo irá repetir o mesmo processo, mas irá adicionar a descrição no ArrayDescricao*/
    /* mas não irá colocar na divisão azul */
    topicosInseridosDescricao.push(document.getElementById("description-task").value)

    /*debug*/
    //console.log(topicosInseridosDescricao)

    /*limpar os valores preenchidos nos inputs*/
    document.getElementById("title-topic").value = ""
    document.getElementById("description-task").value = ""
}


/*função para abrir uma div contendo os conteúdos relacionado à tarefa,
exemplo: cliquei no topico tal, abrirá uma div com titulo e descrição em baixo*/

function abrirExpendedTopic(indiceArray) {
    /*esete código vai procurar o elemento com o id 'expended-topi' e vai excluir, caso não exista ele irá adicionar uma nova div*/
    if (document.getElementById("expended-topic")) {
        document.getElementById("expended-topic").remove()
    }

    var tituloDoTopico = topicosInseridosTitulo[indiceArray]
    var descricaoDoTopico = topicosInseridosDescricao[indiceArray]

    /*criando a div automaticamente*/

    var divExpendedTopic = document.createElement("div")

    divExpendedTopic.id = "expended-topic"
    divExpendedTopic.className = "classe-expended-topic d-flex"

    var conteudoDaDiv = "<h3>" + tituloDoTopico + "</h3><p>" + descricaoDoTopico + "</p><button type='button' onclick='closeExpendedTopic()'>Close</button>"

    divExpendedTopic.innerHTML = conteudoDaDiv

    document.getElementById("window-new-task").appendChild(divExpendedTopic)

    /*debugando*/
    //console.log(indiceArray)
}

/*a função criada abaixo, simplesmente terá que excluir o 'expendedtopic' que foi criado dinamicamente com outra função*/

function closeExpendedTopic() {
    document.getElementById("expended-topic").remove()
}

/*a partir dos topicos serem inseridos em seus arrays, agora é preciso adicionar o titulo da tarefa em um array somente com estas tarefas*/
var arrayTask = Array()

var itemTarefa = 0

function saveTask() {

    //apagando o array existente para não repetí-lo duas ou mais vezes
    var tamanhoArray = topicosInseridosTitulo.length
        //esta única variável acima ja é suficiente para limpar array dos titulos e da descrição
    console.log(tamanhoArray)
    if (tamanhoArray > 2) {

        topicosInseridosTitulo.forEach(function() {
            topicosInseridosTitulo.shift(topicosInseridosTitulo[tamanhoArray])
            topicosInseridosDescricao.shift(topicosInseridosDescricao[tamanhoArray])
        });
        console.log(tamanhoArray)
    }


    var tituloTarefa = document.getElementById("title-task").value

    arrayTask.push(arrayTask["id_task"] = "tarefa-" + itemTarefa + "", arrayTask["titulo-tarefa"] = tituloTarefa, arrayTask["titulo-tarefa"] = tituloTarefa, arrayTask["titulo-topico"] = topicosInseridosTitulo, arrayTask["descricao-topico"] = topicosInseridosDescricao)

    //com este código de criação do array tarefa, ele cria 5 indices numericos, repete o titulo da tarefa e depois cria mais 4 índices textuais com os mesmos valores, a função abaixo serve para excluir os índices numéricos no inicio do arrayTask
    for (let x = 0; x < 6; x++) {
        arrayTask.shift(arrayTask[x])
            //com este "for" excluimos os valores repetidos e com indices numéricos
    }

    //incrementando a variavel que adicionará um identificador no arrayTask
    itemTarefa++
    console.log(arrayTask)

    /*para cada tarefa salva, é preciso excluir o array de titulos de topicos e descricoes, além de apagar o input 
    de titulo de tarefa*/
    document.getElementById("title-task").value = ""

    //apagando os itens da lista lateral direito azul existente
    document.getElementById("list-added-tasks").innerHTML = ""

}