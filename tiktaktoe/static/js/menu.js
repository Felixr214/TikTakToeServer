let player = -1
function startplayer() {
    if (document.getElementById("sp").checked){
        console.log("You start");
        player = 1;
    }
    else {
        console.log("Computer starts");
    }
}


function newGame(token) {
    let formData = new FormData();
    formData.append("start_player", player.toString())
    formData.append("csrfmiddlewaretoken", token);

    fetch("newGame/", {
        method: "POST",
        body: formData
    });
    open("TikTakToe/", "_self")
}