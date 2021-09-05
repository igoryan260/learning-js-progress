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
    console.log("passando no array: " + passandoPeloArray)

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

    var tituloTarefa = document.getElementById("title-task").value
        //estes arrays abaixo foram criados dentro da function para que o valor deles não sejam apagados com a 'function limparArrayList'
    var tituloTopico = Array()
    var descricaoTopico = Array()

    for (let index = 0; index < topicosInseridosTitulo.length; index++) {
        tituloTopico.push(topicosInseridosTitulo[index])
        descricaoTopico.push(topicosInseridosDescricao[index])
    }

    arrayTask.push(Array(itemTarefa, tituloTarefa, tituloTopico, descricaoTopico))

    //incrementando a variavel que adicionará um identificador no arrayTask
    itemTarefa++


    /*para cada tarefa salva, é preciso excluir o array de titulos de topicos e descricoes, além de apagar o input 
    de titulo de tarefa*/
    document.getElementById("title-task").value = ""

    //apagando os itens da lista lateral direito azul existente
    document.getElementById("list-added-tasks").innerHTML = ""
    limparArrayList()

    //criando card na tela inicial
    criarCardTask()

    //tirar aviso de tarefa inexistente
    document.getElementById("p-warning-no-task").className = "d-none"
        //fechar janela onde adiciona tarefas
    abrirJanelaAddTask()

    console.log(arrayTask)
}



//limpando array dos items na lista, para não repeti-los em outras tarefas 
function limparArrayList() {

    //apagando o array existente para não repetí-lo duas ou mais vezes
    var tamanhoArray = topicosInseridosTitulo.length
        //esta única variável acima ja é suficiente para limpar array dos titulos e da descrição

    if (tamanhoArray > 0) {
        for (let indice = 0; indice < tamanhoArray; indice++) {
            topicosInseridosTitulo.shift(topicosInseridosTitulo[indice])
            topicosInseridosDescricao.shift(topicosInseridosDescricao[indice])
        }
        //esta variável abaixo serve para reiniciar a contagem do zero para pegar os indices corretos do arrayLista. Assim foi corrigido o bug de 'indefined'
        passandoPeloArray = 0
    }
}

function criarCardTask() {
    let indiceTarefa
    reduzirValorItemTarefa()
        //tranformar um valor da variavel, para que ela possa ser reutilizada porém com uma unidade a menos
    function reduzirValorItemTarefa() {
        indiceTarefa = itemTarefa - 1
        return indiceTarefa
    }

    //encontrar o id da div que comporta os cards e criar os elementos com id's diferentes
    var cardObject = document.createElement("div")
    cardObject.className = "classe-card-task card"
    cardObject.id = "card" + indiceTarefa
    document.getElementById("containerCards").appendChild(cardObject)



    //criando elementos dentro dos cards 
    var divTitleTask = document.createElement("div")
    divTitleTask.className = "title-card-task d-flex"
    divTitleTask.innerHTML = "<h3>" + arrayTask[indiceTarefa][1] + "</h3><span>30%</span>"

    document.getElementById("card" + indiceTarefa).appendChild(divTitleTask)

    //criação da lista para trabalhar a lógica de criação de listas dos tópicos

    var listaTopicos = document.createElement("ul")
    listaTopicos.id = "lista" + indiceTarefa
    document.getElementById("card" + indiceTarefa).appendChild(listaTopicos)


    //para cada elemento do array, criar um elemento li com a informação correspondente ao índice do array task [titulo-topico]
    for (let indiceLista = 0; indiceLista < arrayTask[indiceTarefa][2].length; indiceLista++) {
        var itensLista
        itensLista = document.createElement("li")
        itensLista.innerHTML = arrayTask[indiceTarefa][2][indiceLista]
        document.getElementById("lista" + indiceTarefa).appendChild(itensLista)
    }

    //criando uma function para abrir a tarefa e seus tópicos em um outro card
    cardObject.addEventListener("click", function() {
        var identificadorTarefa = parseInt(cardObject.id.substring(4, 5))

        const dadosTarefa = arrayTask.filter(function(elem, index, arr) {
            return index == identificadorTarefa
        })

        //console.log(identificadorTarefa)

        //console.log(dadosTarefa[0][1])
        //console.log(dadosTarefa[0][2])
        //console.log(dadosTarefa[0][3])

        abrirTarefa(dadosTarefa[0][1], dadosTarefa[0][2], dadosTarefa[0][3])
            /*
                Neste código acima, o indice 0 sempre será zero, porque se trata de um novo array, e cada clique em um card criara ou sobreescreverá o array com apenas um índice
                isso significa que terá sempre um único indice no array. Quanto aos índices em seguida, '1' significa que é o título, '2' significa os titulos dos tópicos
                e '3' siginifica a descrição de cada tópico
            */
    })


}

function abrirTarefa(tituloTarefa, topicoTarefa, descricaoTarefa) {
    //display none nos cards encolhidos, para aparecer somente os cards expandidos
    document.getElementById("containerCards").className = "d-none"

    var cardExpandido = document.getElementById("cards-expanded")
    cardExpandido.className = "classe-open-task"

    var divTituloAndProgress = document.createElement("div")
    divTituloAndProgress.id = "task-expanded"
    divTituloAndProgress.className = "title-open-task d-flex"
    divTituloAndProgress.innerHTML = "<h3>" + tituloTarefa + "</h3><span>COMPLETE</span>"
    cardExpandido.appendChild(divTituloAndProgress)



    //nome dos tópicos e criando card também
    for (let index = 0; index < topicoTarefa.length; index++) {

        var divTopicos = document.createElement("div")
        divTopicos.id = "topicos" + index

        var divTopicName = document.createElement("div")
        divTopicName.className = "classe-topic-name d-flex"
        divTopicName.innerHTML += "<span>" + topicoTarefa[index] + "</span><button class='btn-conclude-topic'>Conclude</button>"
        divTopicos.appendChild(divTopicName)

        var descriptionTopic = document.createElement("p")
        descriptionTopic.className = "paragraph-description"
        descriptionTopic.innerHTML += descricaoTarefa[index]
        divTopicos.appendChild(descriptionTopic)

        cardExpandido.appendChild(divTopicos)
    }

    //criando button para fechar card-expandido
    var btn_close_card = document.createElement("button")
    btn_close_card.id = "closeCardsExpanded"
    btn_close_card.innerHTML = "Close"
    cardExpandido.appendChild(btn_close_card)
    btn_close_card.addEventListener("click", function() {
        fecharCardsExpandidos(topicoTarefa)
    })

    //debugando codigo
    console.log(tituloTarefa, topicoTarefa, descricaoTarefa)

    //divTituloProgresso.innerHTML = "<h3>Task(Title)</h3><span>COMPLETE</span>"
}

function fecharCardsExpandidos(quantidadeTopicos) {
    document.getElementById("task-expanded").remove()
    document.getElementById("closeCardsExpanded").remove()


    for (let index = 0; index < quantidadeTopicos.length; index++) {
        document.getElementById("topicos" + index).remove()
    }
    document.getElementById("cards-expanded").className = "d-none"
    document.getElementById("containerCards").className = "d-flex"
}