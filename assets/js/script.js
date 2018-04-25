/* DEFINIR LES NOMS DE CLASSES POUR LES PIONS */
var circle = "far fa-circle";
var cross = "fas fa-times";

/* FREEZE GAME */
var freeze = false;

/* DERNIER MOVE */
var lastMove = null;

/* NOMBRE DE CASES REMPLIES */
var moves = 0;

/* SCORE */
var score = {
  circle: 0,
  cross: 0
};

/* GRILLE POUR ASSIGNATION DES PIONS */
var grid = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null
};

/* LE JOUEUR FAIT UN MOVE */
function play(id) {
  var block = document.getElementById(id);
  var content = block.innerHTML;
  if (!content && !freeze) {
    if (!lastMove || lastMove === "cross") {
      block.innerHTML = `<i class="${circle}"></i>`;
      analyzeGrid("circle", id);
    } else {
      block.innerHTML = `<i class="${cross}"></i>`;
      analyzeGrid("cross", id);
    }
  }
}

/* ANALYSE DE LA GRILLE */
function analyzeGrid(player, id) {
  lastMove = player;
  grid[id] = player;
  // LIGNES
  if (grid[1] === player && grid[2] === player && grid[3] === player) {
    return endGame(player);
  }
  if (grid[4] === player && grid[5] === player && grid[6] === player) {
    return endGame(player);
  }
  if (grid[7] === player && grid[8] === player && grid[9] === player) {
    return endGame(player);
  }
  // COLONNES
  if (grid[1] === player && grid[4] === player && grid[7] === player) {
    return endGame(player);
  }
  if (grid[2] === player && grid[5] === player && grid[8] === player) {
    return endGame(player);
  }
  if (grid[3] === player && grid[6] === player && grid[9] === player) {
    return endGame(player);
  }
  // DIAGONALES
  if (grid[1] === player && grid[5] === player && grid[9] === player) {
    return endGame(player);
  }
  if (grid[3] === player && grid[5] === player && grid[7] === player) {
    return endGame(player);
  }
  moves += 1;
  if (moves === 9) {
    return cleanGrid();
  } else {
    whoPlays();
    return false;
  }
}

/* NETTOYAGE DE LA GRILLE */
function cleanGrid(now = false) {
  freeze = true;
  setTimeout(function() {
    var elements = document.getElementsByClassName("block");
    [].forEach.call(elements, (element, index) => {
      element.innerHTML = "";
      grid[index + 1] = null;
    });
    moves = 0;
    freeze = false;
  }, 2000);
}

/* FIN DU JEU */
function endGame(player) {
  cleanGrid();
  if (player) {
    score[player] += 1;
    document.getElementById(player).innerText = score[player];
    lastMove = lastMove === "circle" ? "cross" : "circle";
  }
  whoPlays();
}

/* A QUI LE TOUR ? */
function whoPlays() {
  if (lastMove === "circle") {
    document.getElementById("whoPlays").innerText = "Au tour des croix...";
  } else {
    document.getElementById("whoPlays").innerText = "Au tour des ronds...";
  }
}
