/* DEFINIR LES NOMS DE CLASSES POUR LES playerS */
var circle = "far fa-circle";
var cross = "fas fa-times";
//<i class="fas fa-times"></i>

var lastMove = null;

var moves = 0;

var score = {
  circle: 0,
  cross: 0
};

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

function play(id) {
  var block = document.getElementById(id);
  var content = block.innerHTML;
  if (!content) {
    if (!lastMove || lastMove === "cross") {
      block.innerHTML = `<i class="${circle}"></i>`;
      analyzeGrid("circle", id);
    } else {
      block.innerHTML = `<i class="${cross}"></i>`;
      analyzeGrid("cross", id);
    }
  }
}

function analyzeGrid(player, id) {
  lastMove = player;
  grid[id] = player;
  //console.log(grid);
  // LINES
  if (grid[1] === player && grid[2] === player && grid[3] === player) {
    return endGame(player);
  }
  if (grid[4] === player && grid[5] === player && grid[6] === player) {
    return endGame(player);
  }
  if (grid[7] === player && grid[8] === player && grid[9] === player) {
    return endGame(player);
  }
  // COLUMNS
  if (grid[1] === player && grid[4] === player && grid[7] === player) {
    return endGame(player);
  }
  if (grid[2] === player && grid[5] === player && grid[8] === player) {
    return endGame(player);
  }
  if (grid[3] === player && grid[6] === player && grid[9] === player) {
    return endGame(player);
  }
  // CROSS
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
    return false;
  }
}

function cleanGrid() {
  var elements = document.getElementsByClassName("block");
  [].forEach.call(elements, (element, index) => {
    element.innerHTML = "";
    grid[index + 1] = null;
  });
  moves = 0;
}

function endGame(player) {
  cleanGrid();
  if (player) {
    score[player] += 1;
    document.getElementById(player).innerText = score[player];
    lastMove = lastMove === "circle" ? "cross" : "circle";
  }
}