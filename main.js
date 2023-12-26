const windowDoom = document.querySelector('.window');
const cells = document.querySelectorAll('.window .cell');

let doomMatrix = [[],[],[]];
let clickCounter = 0;
let index = 0;

for (let i = 0; i < doomMatrix.length; i++) {
  for (let j = 0; j < 3; j++) {
    doomMatrix[i].push(cells[index])
    index++;
  };
};
// Функция добавления кружочков
function addZero(cell) {
  if (!cell.hasChildNodes()) {
  const imagePath = "./view./Нолик.png";
  const image = document.createElement('img');
  image.src = imagePath;
  cell.appendChild(image);
  }
};
// Функция добавления крестиков
function addCross(cell) {
  if (!cell.hasChildNodes()) {
  const imagePath = "./view./Крестик.png";
  const image = document.createElement('img');
  image.src = imagePath;
  cell.appendChild(image);
  }
};

// Функция проверки условий победы
function highlightWinner(cells) {
  cells.forEach((cell) => {
    cell.classList.add('winner');
  });
}

// Функция проверки условий победы
function checkWin() {
  // Проверка по строкам
  for (let i = 0; i < 3; i++) {
    if (
      doomMatrix[i][0].innerHTML !== "" &&
      doomMatrix[i][0].innerHTML === doomMatrix[i][1].innerHTML &&
      doomMatrix[i][0].innerHTML === doomMatrix[i][2].innerHTML
    ) {
      return [doomMatrix[i][0], doomMatrix[i][1], doomMatrix[i][2]];
    }
  }

  // Проверка по столбцам
  for (let i = 0; i < 3; i++) {
    if (
      doomMatrix[0][i].innerHTML !== "" &&
      doomMatrix[0][i].innerHTML === doomMatrix[1][i].innerHTML &&
      doomMatrix[0][i].innerHTML === doomMatrix[2][i].innerHTML
    ) {
      return [doomMatrix[0][i], doomMatrix[1][i], doomMatrix[2][i]];
    }
  }

  // Проверка по диагоналям
  if (
    doomMatrix[0][0].innerHTML !== "" &&
    doomMatrix[0][0].innerHTML === doomMatrix[1][1].innerHTML &&
    doomMatrix[0][0].innerHTML === doomMatrix[2][2].innerHTML
  ) {
    return [doomMatrix[0][0], doomMatrix[1][1], doomMatrix[2][2]];
  }

  if (
    doomMatrix[0][2].innerHTML !== "" &&
    doomMatrix[0][2].innerHTML === doomMatrix[1][1].innerHTML &&
    doomMatrix[0][2].innerHTML === doomMatrix[2][0].innerHTML
  ) {
    return [doomMatrix[0][2], doomMatrix[1][1], doomMatrix[2][0]];
  }

  return null;
}
// Обработка кликов
for (let i = 0; i < doomMatrix.length; i++) {
  for (let j = 0; j < 3; j++) {
    const cell = doomMatrix[i][j];

    cell.addEventListener('click', function () {
      if (!cell.hasChildNodes()) {
        clickCounter++;

        if (clickCounter % 2 === 0) {
          addCross(cell);
        } else {
          addZero(cell);
        }

        if (clickCounter >= 5) {
          // Проверка условий победы после 5-го хода
          const winningCells = checkWin();
          if (winningCells) {
            // Победа! Подсветить победную линию
            highlightWinner(winningCells);
          }
        }
      }
    });
  }
}