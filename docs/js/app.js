let app = {
  sizeGrid: {
    nbrRow: 4,
    nbrCell: 6,
  },

  players: {
    positionX: 0,
    positionY: 0,
    direction: "droite",
  },

  targetCell: {
    positionX: 350,
    positionY: 210,
  },

  btnDirection: {
    left: document.querySelector(".flech_gauche"),
    right: document.querySelector(".flech_droite"),
    go: document.querySelector(".flech_avant"),
  },

  rotatePlayer: 0,

  board: document.querySelector("#board"),

  gameOver: false,

  modalWin: document.querySelector(".modal_win"),

  textNbrEssaie: document.querySelectorAll(".nbr_essais"),

  nbrEssaie: 0,

  clickLeft: () => {
    app.btnDirection.left.addEventListener("click", () => {
      app.turnLeft();
    });
  },

  clickRight: () => {
    app.btnDirection.right.addEventListener("click", () => {
      app.turnRight();
    });
  },

  clickForward: () => {
    app.btnDirection.go.addEventListener("click", () => {
      app.moveForward();
    });
  },

  positionPlayerTargetCell: (div) => {
    let childDivRow = div.childNodes;

    for (const pos of childDivRow) {
      let boardRect = board.getBoundingClientRect();
      let posRect = pos.getBoundingClientRect();
      let resultRectX = posRect.x - boardRect.x;
      let resultRectY = posRect.y - boardRect.y;

      if (
        resultRectX === app.players.positionX &&
        resultRectY === app.players.positionY
      ) {
        pos.classList.add("player");
        switch (app.players.direction) {
          case "droite":
            pos.style.transform = `rotate(${app.rotatePlayer}deg)`;
            break;
          case "gauche":
            pos.style.transform = `rotate(${app.rotatePlayer}deg)`;
            break;
          case "avant":
            break;
          case "arriere":
            break;
          default:
            break;
        }
      }

      if (
        resultRectX === app.targetCell.positionX &&
        resultRectY === app.targetCell.positionY
      ) {
        pos.classList.add("targetCell");
      }
    }
  },

  turnLeft: () => {
    if (app.gameOver === false) {
      app.players.direction = "droite";
      if (app.rotatePlayer === 0) {
        app.rotatePlayer = 360;
        app.rotatePlayer -= 90;
      } else {
        app.rotatePlayer -= 90;
      }
      app.reDrawBoard();
      app.nbrEssaie++;
    }
  },

  turnRight: () => {
    if (app.gameOver === false) {
      app.players.direction = "gauche";
      if (app.rotatePlayer === 360) {
        app.rotatePlayer = 0;
        app.rotatePlayer += 90;
      } else {
        app.rotatePlayer += 90;
      }
      app.reDrawBoard();
      app.nbrEssaie++;
    }
  },

  moveForward: () => {
    if (app.gameOver === false) {
      app.nbrEssaie++;
      switch (app.rotatePlayer) {
        case 0:
          if (app.players.positionX < 350 && app.players.positionX > -1) {
            app.players.positionX += 70;
          }
          break;
        case 90:
          if (app.players.positionY < 210 && app.players.positionY > -1) {
            app.players.positionY += 70;
          }
          break;
        case 180:
          if (app.players.positionX < 351 && app.players.positionX > 0) {
            app.players.positionX -= 70;
          }
          break;
        case 270:
          if (app.players.positionY >= 70 && app.players.positionY <= 210) {
            app.players.positionY -= 70;
          }
          break;
        case 360:
          if (app.players.positionX < 350 && app.players.positionX > -1) {
            app.players.positionX += 70;
          }
          break;
        default:
          break;
      }
    }

    app.reDrawBoard();
  },

  listenKeyboardEvents: () => {
    document.addEventListener("keyup", (event) => {
      if (app.gameOver === false) {
        switch (event.key) {
          case "ArrowUp":
            app.moveForward();
            break;
          case "ArrowLeft":
            app.turnLeft();
            break;
          case "ArrowRight":
            app.turnRight();
            break;

          default:
            break;
        }
      }
    });
  },

  drawBoard: () => {
    for (let i = 0; i < app.sizeGrid.nbrRow; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "row");

      for (let j = 0; j < app.sizeGrid.nbrCell; j++) {
        let divInDiv = document.createElement("div");
        divInDiv.setAttribute("class", "cell");
        div.appendChild(divInDiv);
      }

      app.board.appendChild(div);
      app.positionPlayerTargetCell(div);
    }

    app.isGameOver();
  },

  clearBoard: () => {
    while (app.board.firstChild) {
      app.board.removeChild(app.board.firstChild);
    }
  },

  reDrawBoard: () => {
    app.clearBoard();
    app.drawBoard();
  },

  isGameOver: () => {
    if (
      app.players.positionX === app.targetCell.positionX &&
      app.players.positionY === app.targetCell.positionY
    ) {
      app.gameOver = true;
      app.modalWin.classList.add("active_modal");
      for (const list of app.textNbrEssaie) {
        list.textContent = app.nbrEssaie;
      }
    }
  },

  clickModal: () => {
    app.modalWin.addEventListener("click", (e) => {
      e.target.classList.remove("active_modal");
      window.location.reload(true);
    });
  },

  init: () => {
    app.clickModal();
    app.listenKeyboardEvents();
    app.clickForward();
    app.clickLeft();
    app.clickRight();
    app.drawBoard();
  },
};

document.addEventListener("DOMContentLoaded", app.init);
