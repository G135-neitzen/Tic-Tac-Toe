function createPlayer() {
    let player = "X";
    return {
        get: () => player,
        set: (value) => player = value,
        toggle: () => player = player === "X" ? "O" : "X"
    };
}

function createGame() {
    let cells = document.querySelectorAll(".cell")
    let statusText = document.querySelector("#statusText")
    let restartBtn = document.querySelector("#resetBtn")
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = createPlayer()
    let running = false;

    function cellClicked() {
        const cellIndex = this.getAttribute("cellIndex");
        if (options[cellIndex] != "" || !running) {
            return;
        }

        updateCell(this, cellIndex);
        checkWinner();
    }

    function updateCell(cell, index) {
        options[index] = currentPlayer.get();
        cell.textContent = currentPlayer.get();
    }

    function changePlayer() {
        currentPlayer.toggle();
        statusText.textContent = `${currentPlayer.get()}'s turn`;
    }
    function checkWinner() {
        let roundWon = false;

        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];

            if (cellA == "" || cellB == "" || cellC == "") {
                continue;
            }
            if (cellA == cellB && cellB == cellC) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `${currentPlayer.get()} wins!`;
            running = false;
        }
        else if (!options.includes("")) {
            statusText.textContent = `Draw`;
            running = false;
        }
        else {
            changePlayer();
        }
    }

    function restartGame() {
        currentPlayer.set("X")
        options = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `${currentPlayer.get()}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        running = true;
    }

    return {
        initializeGame() {
            cells.forEach(cell => cell.addEventListener("click", cellClicked));
            restartBtn.addEventListener("click", restartGame);
            statusText.textContent = `${currentPlayer.get()}'s turn`;
            running = true;
        },
    }
}


const game = createGame();
game.initializeGame();