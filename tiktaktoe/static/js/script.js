let gameOver = "";
let player = 1;
let field = [0,0,0,0,0,0,0,0,0];
let startPlayer = 0;
let winner = 0;
let receivedSp = false;
let receivedWinner = false;

window.onload = function() {
    getStartplayer();
    setTimeout(function () {
        initField();
    }, 100);
}

function initField() {
    for (let i = 0; i < 9; i++){
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.classList = ["empty"];
        tile.addEventListener("click", markField);
        document.getElementById("board").appendChild(tile);
    }
    if (startPlayer === "-1") {
        getComputerMove();
    }
}

function markField() {
    if (gameOver === "True"){
        return;
    }
    let tile = document.getElementById(this.id);
    if (field[Number(tile.id)] === 0){
        field[Number(tile.id)] = player;
        getComputerMove();
    }
}

function home() {
    open(window.location.origin, "_self")
}

function getComputerMove() {
    let token = getToken();
    let f = field.toString();
    let formData = new FormData();
    formData.append("field", f)
    formData.append("csrfmiddlewaretoken", token);

    fetch(window.location.origin +"/getMove/", {
        method: "POST",
        body: formData
    }).then(response=> response.json().then((data => {
        let f_ = data["f"];
        let finished_ = data["finished"];
        field = f_;
        gameOver = finished_;
        setTimeout(function () {
            updateView();
            }, 100);
    })));
}

function getStartplayer() {
    let token = getToken();
    let formData = new FormData();
    formData.append("csrfmiddlewaretoken", token);

    fetch(window.location.origin +"/getStartplayer/", {
        method: "POST",
        body: formData
    }).then(response=> response.json().then((data => {
        startPlayer = data["sp"];
        receivedSp = true;
    })));
}

function updateView() {
    for (let a = 0; a < field.length; a++){
        let tile = document.getElementById(a.toString());
        if (field[a] === 0){
            tile.classList = ['empty'];
        }
        if (field[a] === 1){
            tile.classList = ['player1'];
        }
        if (field[a] === -1){
            tile.classList = ['player2'];
        }
    }
    if (gameOver === "True"){
        finish();
        setTimeout(function () {
            showRes();
            }, 100);
    }
}

function getToken() {
    let cookieValue = null;
    let name = "csrftoken"
    if (document.cookie) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue
}

function restart(){
    let formData = new FormData();
    let token = getToken();
    formData.append("start_player", startPlayer);
    formData.append("csrfmiddlewaretoken", token);

    fetch(window.location.origin + "newGame/", {
        method: "POST",
        body: formData
    });
    open(window.location.origin + "/TikTakToe/", "_self");
}

function finish() {
    let token = getToken();
    let formData = new FormData();
    formData.append("csrfmiddlewaretoken", token);

    fetch(window.location.origin +"/getWinner/", {
        method: "POST",
        body: formData
    }).then(response=> response.json().then((data => {
        winner = data["winner"];
        receivedWinner = true;
    })));}

function showRes() {
    let res = document.getElementById("result");
    let resHeader = document.createElement("h1");
    if (winner === 0){
            resHeader.innerText = "Draw";
    }
    if (winner === -1){
            resHeader.innerText = "You lost";
    }
    if (winner === 1){
            resHeader.innerText = "You won";
    }
    res.appendChild(resHeader);
}
