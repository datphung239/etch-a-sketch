const grid = document.querySelector(".grid");
const page = document.querySelector(".main");
//  Default background color, pen color, number of squares inside grid
grid.style.backgroundColor = "#FFFFFF";
let squareColor = "#000000";
function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  square.classList.add("square-border");
  grid.appendChild(square);
}
let squaresNumber = 30;
grid.style.cssText += `grid-template-columns: repeat(${squaresNumber}, 1fr)`;
for (sq = 1; sq <= squaresNumber * squaresNumber; sq++) {
  createSquare();
}
let squares = document.querySelectorAll(".square");
// Remove, Add gridlines
const gridLines = document.querySelector(".grid-line");

function removeGridLines() {
  squares.forEach((square) => {
    square.classList.remove("square-border");
  });
}
function addGridLines() {
  squares.forEach((square) => {
    square.classList.add("square-border");
  });
}

// Change grid size
gridSizeBar = document.querySelector(".size-adjust #slider");
function changeGridBadge(squaresNumber) {
  gridSizeBadge = document.querySelector(".size-adjust p");
  gridSizeBadge.innerText = `Grid Size: ${squaresNumber} x ${squaresNumber}`;
}
function changeGridSize() {
  // Erase current content
  resetAllSquare();
  // Input changed
  squaresNumber = this.value;
  if (squaresNumber === undefined) {
    squaresNumber = 30; // For reset default
    gridSizeBar.value = "30";
  }
  // Change badge text
  changeGridBadge(squaresNumber);
  // Reset grid
  grid.style.cssText += `grid-template-columns: repeat(${squaresNumber}, 1fr)`;
  // Append or remove squares
  while (squares.length < squaresNumber * squaresNumber - 1) {
    squares = document.querySelectorAll(".square");
    createSquare();
  }
  while (squares.length > squaresNumber * squaresNumber + 1) {
    squares = document.querySelectorAll(".square");
    squares[0].parentNode.removeChild(squares[0]);
  }
  squares = document.querySelectorAll(".square");
  // If gridlines turn off then remove the rest
  if (!gridLines.classList.contains("btn-on")) removeGridLines();
}

gridSizeBar.addEventListener("input", (event) => {
  squaresNumber = event["srcElement"].value;
  changeGridBadge(squaresNumber);
});
gridSizeBar.addEventListener("mouseup", changeGridSize);

// Toggle (Use for rainbow, random, lighten, shading pen, eraser)
const buttons = page.querySelectorAll("button");
function resetAllBtn(event) {
  if (!event.classList.value.includes("grid-line")) {
    buttons.forEach((button) => {
      if (!button.classList.value.includes("grid-line")) {
        button.classList.remove("btn-on");
      }
    });
  }
}

page.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const toggleBtn = event.target;
    // Work with clear feature
    // If current select pen is lighten, darken & eraser then remove
    if (toggleBtn.innerText === "Clear") {
      buttons.forEach((button) => {
        const targetBtn = button.classList.value;
        if (
          targetBtn === "eraser btn-on" ||
          targetBtn === "darken btn-on" ||
          targetBtn === "lighten btn-on"
        ) {
          return button.classList.remove("btn-on");
        }
      });
      return;
    } else if (toggleBtn.innerText === "Reset") {
      resetAll(event);
      return;
      // If remove glid lines clicked
    } else if (toggleBtn.innerText.includes("Remove")) {
      gridLines.innerText = "Show Grid Lines";
      removeGridLines();
      toggleBtn.classList.remove("btn-on");
      return;
      // If show glid lines clicked
    } else if (toggleBtn.innerText.includes("Show")) {
      gridLines.innerText = "Remove Grid Lines";
      addGridLines();
    }
    // Remove current clicked pen if double click
    if (toggleBtn.classList.contains("btn-on")) {
      return toggleBtn.classList.remove("btn-on");
    }
    // Delete all pen with button on (Reset)
    resetAllBtn(event.target);
    // Then turn button on for current clicked pen
    toggleBtn.classList.add("btn-on");
  }
});
// Color fill specific area
const areaFill = document.querySelector(".area");
function toFill(event) {
  // Get squares around target square and put on arrays
  arrAroundSqr = (element) => {
    const squareIdx = Array.from(element.parentElement.children).indexOf(
      element
    );
    topSqr = squares[squareIdx - squaresNumber];
    botSqr = squares[squareIdx + squaresNumber];
    leftTopSqr = squares[squareIdx - squaresNumber - 1];
    rightTopSqr = squares[squareIdx - squaresNumber + 1];
    leftBotSqr = squares[squareIdx + squaresNumber - 1];
    rightBotSqr = squares[squareIdx + squaresNumber + 1];
    if (squareIdx % squaresNumber == 0) {
      leftSqr = undefined;
      leftTopSqr = undefined;
      leftBotSqr = undefined;
    } else {
      leftSqr = squares[squareIdx - 1];
    }
    if ((squareIdx + 1) % squaresNumber == 0) {
      rightSqr = undefined;
      rightTopSqr = undefined;
      rightBotSqr = undefined;
    } else {
      rightSqr = squares[squareIdx + 1];
    }
    arrs = [
      element,
      leftTopSqr,
      topSqr,
      rightTopSqr,
      rightSqr,
      rightBotSqr,
      botSqr,
      leftBotSqr,
      leftSqr,
    ];
    cleanArrs = [];
    arrs.forEach((arr) => {
      if (arr !== undefined) {
        if (!arr.style.backgroundColor) {
          cleanArrs.push(arr);
        }
      }
    });

    return cleanArrs;
  };
  // Fill

  /*
    Bug : Specific Area not working well .... 
    */
  let sqrArr = arrAroundSqr(event);
  let i = 0;
  while (i < 10) {
    sqrArr.forEach((sqr) => {
      sqr.style.cssText = `background:${squareColor}`;
      arrAroundSqr(sqr).forEach((_) => {
        if (!sqrArr.includes(_)) {
          sqrArr.push(_);
        }
      });
    });
    i++;
  }
}

// Color fill full area
const fullFillBtn = document.querySelector("#fill .full");

// Toggle random
const randomBtn = document.querySelector(".random");

function randColor() {
  // Function return rancom color
  const rdC1 = Math.floor(Math.random() * 256);
  const rdC2 = Math.floor(Math.random() * 256);
  const rdC3 = Math.floor(Math.random() * 256);
  return `rgb(${rdC1}, ${rdC2}, ${rdC3})`;
}

// Toggle rainbow
const rainbowBtn = document.querySelector(".rainbow");
const rainbowCorArr = [
  "#9400D3",
  "#4B0082",
  "#0000FF",
  "#00FF00",
  "#FFFF00",
  "#FF7F00",
  "#FF0000",
];

function rainbowColor() {
  return rainbowCorArr[Math.floor(Math.random() * rainbowCorArr.length)];
}
// Toggle Lighten & darken
const lightenBtn = document.querySelector(".lighten");
const darkenBtn = document.querySelector(".darken");

function rgbChange(rgb, level) {
  r = parseInt(rgb[0]);
  g = parseInt(rgb[1]);
  b = parseInt(rgb[2]);
  if (r <= 255) r += level;
  if (g <= 255) g += level;
  if (b <= 255) b += level;
  return `rgb(${r}, ${g}, ${b})`;
}

// Toggle eraser
const eraserBtn = document.querySelector(".eraser");

// Clear all (Clear the grid only)

const clearBtn = document.querySelector(".clear");
function resetAllSquare() {
  squares.forEach((square) => {
    if (square.style.cssText) {
      square.removeAttribute("style");
    }
  });
}
clearBtn.addEventListener("click", resetAllSquare);

// Reset all (Clear grid, pen, background to default)
const resetBtn = document.querySelector(".reset");
function resetAll(event) {
  bgColor.value = "#ffffff";
  penColor.value = "#202020";
  grid.style.backgroundColor = "#FFFFFF";
  squareColor = "#000000";
  resetAllSquare();
  resetAllBtn(event.target);
  changeGridSize();
  if (!squares[0].classList.value.includes("square-border")) {
    addGridLines();
  }
  gridLines.classList.add("btn-on");
  gridLines.innerText = "Remove Grid Lines";
}

// Hold to draw
function toDraw(event) {
  if (event.buttons == 1) {
    event.preventDefault(); // New to learn
    // Return nothing if not inside of the box
    if (!event["target"].className.includes("square")) {
      return;
      // Areafill
    } else if (areaFill.classList.contains("btn-on")) {
      toFill(event["target"]);
      // Fullfill
    } else if (fullFillBtn.classList.contains("btn-on")) {
      if (!event["target"].style.cssText) {
        squares.forEach((square) => {
          if (!square.style.backgroundColor)
            square.style.backgroundColor = penColor.value;
        });
      }
      // Toggle rainbow color
    } else if (rainbowBtn.classList.contains("btn-on")) {
      event["target"].style.cssText = `background:${rainbowColor()}`;
      // Toggle random color
    } else if (randomBtn.classList.contains("btn-on")) {
      event["target"].style.cssText = `background:${randColor()}`;
      // Toggle random lighten
    } else if (lightenBtn.classList.contains("btn-on")) {
      if (event["target"].style.cssText) {
        // Optimize performance
        rgb = event["target"].style.backgroundColor.match(/\d+/g);
        event["target"].style.cssText = `background:${rgbChange(rgb, 15)}`;
      }
    } else if (darkenBtn.classList.contains("btn-on")) {
      if (event["target"].style.cssText) {
        // Optimize performance
        rgb = event["target"].style.backgroundColor.match(/\d+/g);
        event["target"].style.cssText = `background:${rgbChange(rgb, -15)}`;
      }
      // Eraser
    } else if (eraserBtn.classList.contains("btn-on")) {
      if (event["target"].style.cssText) event.target.removeAttribute("style");
      // Draw  the grid
    } else if (
      event["target"].style.backgroundColor !== hexToRgb(squareColor)
    ) {
      event["target"].style.cssText = `background:${squareColor}`;
    }
  }
}

grid.addEventListener("mousemove", toDraw);
grid.addEventListener("mousedown", toDraw);

// Change background & pen color
let bgColor = document.querySelector("#color-picker-bg");
let penColor = document.querySelector("#color-picker-pen");
bgColor.addEventListener("input", () => {
  grid.style.backgroundColor = bgColor.value;
});
penColor.addEventListener("input", () => {
  squareColor = penColor.value;
  buttons.forEach((button) => {
    if (
      button.classList[0] !== "area" &&
      button.classList[0] !== "full" &&
      button.classList[0] !== "grid-line"
    ) {
      return button.classList.remove("btn-on");
    }
  });
});

// Others function
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
