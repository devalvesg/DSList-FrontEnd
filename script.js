const navListas = document.querySelector(".navListas")
const listas = document.querySelector(".listas")
const urlSearchParams = new URLSearchParams(window.location.search)
const listId = urlSearchParams.get("id")
const gameId = urlSearchParams.get("gameId");
const allGames = urlSearchParams.get("all");
const newGame = urlSearchParams.get("newGame");
const containerGames = document.querySelector(".containerGames")


async function getAllLists() {
    const response = await fetch("http://localhost:8080/lists")
    const data = await response.json();


    data.map((data) => {
        const newH3 = document.createElement("h3");
        const link = document.createElement("a")
        const img = document.createElement("img")

        img.setAttribute("src", "./assets/conecte-se.png")
        link.appendChild(img)
        link.setAttribute("href", `/games.html?id=${data.id}`)
        newH3.textContent = data.name


        listas.appendChild(newH3)
        newH3.appendChild(link)
        newH3.classList.toggle("categorias")
    })
    const h3 = document.createElement("h3");
    const link = document.createElement("a")
    const img = document.createElement("img")

    img.setAttribute("src", "./assets/conecte-se.png")
    link.appendChild(img)
    link.setAttribute("href", `/allGames.html?all=true`)
    h3.textContent = "Todos os jogos"
    listas.appendChild(h3)
    h3.appendChild(link)
    h3.classList.toggle("categorias")
}

async function getGameByList() {
    const response = await fetch(`http://localhost:8080/lists/${listId}/games`)
    const data = await response.json();
    data.map((data) => {
        const div = document.createElement("div");
        const img = document.createElement("img")
        const h1 = document.createElement("h1")
        const h4 = document.createElement("h4")
        const span = document.createElement("span")
        const button = document.createElement("button")
        const link = document.createElement("a")


        div.appendChild(img)
        div.appendChild(h1)
        div.appendChild(span)
        div.appendChild(h4)
        div.appendChild(link)

        div.classList.add("box")

        img.setAttribute("src", `${data.imgUrl}`)
        h1.textContent = data.title;
        h4.textContent = data.shortDescription;
        span.textContent = data.year;
        link.textContent = "Mais Informações"
        link.setAttribute("href", `/oneGame.html?gameId=${data.id}`)
        containerGames.appendChild(div)
    })

}


async function getGame(gameId) {
    const response = await fetch(`http://localhost:8080/games/${gameId}`)
    const data = await response.json();

    const star = document.createElement("img")
    star.setAttribute("src", "./assets/estrela.png")
    star.classList.add("star")
    const imgUrl = document.querySelector(".imgUrl")
    const title = document.querySelector(".title")
    const score = document.querySelector(".score")
    const genre = document.querySelector(".genre")
    const year = document.querySelector(".year")
    const platform = document.querySelector(".platform")
    const longDescription = document.querySelector(".longDescription")


    imgUrl.setAttribute("src", data.imgUrl)
    imgUrl.classList.add("imagensJogos")
    title.textContent = data.title;
    score.textContent += data.score
    score.appendChild(star)
    genre.innerHTML += data.genre
    year.innerHTML += data.year
    platform.innerHTML += data.platforms
    longDescription.innerHTML += data.longDescription
}

const confirmacao = document.querySelector(".confirmacao")
const msgConfirm = document.querySelector(".msgConfirm")
function Confirmacao() {
    msgConfirm.textContent = "Você tem certeza que deseja deletar esse jogo?"
    confirmacao.style.display = "flex"

    const divExist = confirmacao.querySelector(".buttons")
    if (divExist) {
        if (confirmacao.querySelector(".inputScore")) {
            const input = confirmacao.querySelector(".inputScore")
            input.style.display = "none"
        }
    } else {
        const div = document.createElement("div")
        const input = document.createElement("input")
        div.classList.add("buttons")
        input.classList.add("inputScore")

        input.setAttribute("type", "number")
        input.setAttribute("placeholder", "ex: 3.9")

        buttonYes = document.createElement("button")
        buttonYes.setAttribute("onclick", "Deletar()")
        buttonYes.classList.add("sim")
        buttonYes.textContent = "SIM"

        buttonCancel = document.createElement("button")
        buttonCancel.setAttribute("onclick", "Cancelar()")
        buttonCancel.classList.add("cancelar")
        buttonCancel.textContent = "CANCELAR"

        confirmacao.appendChild(input)
        div.appendChild(buttonYes)
        div.appendChild(buttonCancel)
        input.style.display = "none"

        confirmacao.appendChild(div)
    }
}

function ConfirmacaoEdit() {
    msgConfirm.textContent = "Digite um novo score para o jogo"
    confirmacao.style.display = "flex"

    const divExist = confirmacao.querySelector(".buttons")
    if (divExist) {
        const input = confirmacao.querySelector(".inputScore")
        input.style.display = "block"

    }
    else {
        const div = document.createElement("div")
        const input = document.createElement("input")
        div.classList.add("buttons")

        input.classList.add("inputScore")
        input.setAttribute("type", "number")
        input.setAttribute("placeholder", "ex: 3.9")

        buttonYes = document.createElement("button")
        buttonYes.setAttribute("onclick", "Modificar()")
        buttonYes.classList.add("sim")
        buttonYes.textContent = "CONFIRMAR"

        buttonCancel = document.createElement("button")
        buttonCancel.setAttribute("onclick", "Cancelar()")
        buttonCancel.classList.add("cancelar")
        buttonCancel.textContent = "CANCELAR"

        confirmacao.appendChild(input)
        div.appendChild(buttonYes)
        div.appendChild(buttonCancel)

        confirmacao.appendChild(div)
    }
}


function Cancelar() {
    confirmacao.style.display = "none"
}

function Modificar() {
    const input = confirmacao.querySelector(".inputScore")

    fetch(`http://localhost:8080/games/${gameId}`,
        {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                score: input.value
            })
        }
    )
    .then(() => alertaModificacao("Jogo Alterado com sucesso. Redirecionando...", "rgba(17, 255, 0, 0.4)"))
    .catch(() => alertaModificacao("Falha ao alterar o score"))
    
    confirmacao.style.display = "none"
    setTimeout(() => {
        window.location.href = "index.html"
    }, 2500);
}

function Deletar() {
    fetch(`http://localhost:8080/games/${gameId}`,
        {
            method: "DELETE",
        }
    )
    .then(() => alertaModificacao("Jogo deletado com sucesso. Redirecionando...", "rgba(17, 255, 0, 0.4)"))
    .catch(() => alertaModificacao("Falha ao deletar o jogo"))
    
    confirmacao.style.display = "none"
    setTimeout(() => {
        window.location.href = "index.html"
    }, 2500);
}


async function getAllGames() {
    const response = await fetch(`http://localhost:8080/games`)
    const data = await response.json();

    data.map((data) => {
        const div = document.createElement("div");
        const img = document.createElement("img")
        const h1 = document.createElement("h1")
        const h4 = document.createElement("h4")
        const span = document.createElement("span")
        const link = document.createElement("a")

        div.appendChild(img)
        div.appendChild(h1)
        div.appendChild(span)
        div.appendChild(h4)
        div.appendChild(link)

        div.classList.add("box")

        img.setAttribute("src", `${data.imgUrl}`)
        h1.textContent = data.title;
        h4.textContent = data.shortDescription;
        span.textContent = data.year;

        link.textContent = "Mais Informações"
        link.setAttribute("href", `/oneGame.html?gameId=${data.id}`)

        containerGames.appendChild(div)
    })
}


const title = document.querySelector(".title")
var year = document.querySelector(".year")
const category = document.querySelector(".category")
const platform = document.querySelector(".platform")
const score = document.querySelector(".score")
const imgUrl = document.querySelector(".imgUrl")
const shortDescription = document.querySelector(".shortDescription")
const longDescription = document.querySelector(".longDescription")
const erro = document.querySelector(".erro")
const alertRegister = document.querySelector(".alertaModificacao")
const erroCategoria = document.querySelector(".erroCategoria")

function validarInformações() {
    year.value = year.value.trim();
    title.value = title.value.trim();
    score.value = score.value.trim();
    imgUrl.value = imgUrl.value.trim();
    platform.value = platform.value.trim();
    shortDescription.value = shortDescription.value.trim();
    longDescription.value = longDescription.value.trim();

    if (title.value == "") {
        alerta("nome do jogo")
        return false;
    } else if (year.value.length != 4) {
        console.log(title.value)
        alerta("ano do jogo")
        return false;
    } else if (platform.value == "") {
        alerta("plataforma")
        return false;
    } else if (score.value == "") {
        alerta("nota")
        return false;
    } else if (imgUrl.value == "") {
        alerta("imagem")
        return false;
    } else if (shortDescription.value == "") {
        alerta("descriçao curta")
        return false;
    } else if (longDescription.value == "") {
        alerta("descriçao completa")
        return false;
    }
    else {
        return true
    }
}
async function pegarListas() {
    const response = await fetch("http://localhost:8080/lists")
    const data = await response.json();

    data.map((data) => {
        const div = document.createElement("div");
        const input = document.createElement("input")
        const span = document.createElement("span")
        const containerCategory = document.querySelector(".containerCategory")

        div.classList.add("containerInput")
        div.appendChild(input)
        div.appendChild(span)

        input.setAttribute("type", "checkbox")
        input.setAttribute("onclick", "handleCheckbox(this)")
        input.setAttribute("value", `${data.name}`)
        input.classList.add("category")
        span.textContent = data.name

        containerCategory.appendChild(div)
    })
}

var selectedCategory;
function handleCheckbox(checkbox) {
    var checkboxes = document.getElementsByClassName("category");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== checkbox) {
            checkboxes[i].disabled = checkbox.checked;
        }
    }
    selectedCategory = checkbox.value
}




function addNewGame() {
    if (validarInformações()) {
        year = parseInt(year.value)
        fetch("http://localhost:8080/games",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    title: title.value,
                    year: year,
                    genre: selectedCategory,
                    platform: platform.value,
                    score: score.value,
                    imgUrl: imgUrl.value,
                    shortDescription: shortDescription.value,
                    longDescription: longDescription.value
                })
            }
        )
            .then(() => alertaModificacao("Jogo cadastrado com sucesso", "rgba(17, 255, 0, 0.529)"))
            .catch(() => alertaModificacao("Falha ao cadastrar novo jogo"))
    }


}

function alerta(name) {
    errorName = document.querySelector(".errorName")
    errorName.textContent = name
    erro.style.opacity = "1"
    setTimeout(() => {
        erro.style.opacity = "0"
    }, 2000);
}

function alertaModificacao(text, color) {
    alertRegister.textContent = text;
    alertRegister.style.background = color
    alertRegister.style.opacity = "1"
    setTimeout(() => {
        alertRegister.style.opacity = "0"
    }, 2500);
}


if (!listId && !gameId && !allGames && !newGame) {
    getAllLists()
}
else if (gameId) {
    getGame(gameId)
}
else if (listId) {
    getGameByList()
}
else if (allGames) {
    getAllGames()
}
else if (newGame) {
    pegarListas()
}
