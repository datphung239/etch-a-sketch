// Create grid and squares
const grid = document.querySelector(".grid")
const gridSize = (getComputedStyle(grid).width).replace("px","")

let squaresNumber = 40
const squareSize = (gridSize/squaresNumber)
// dynamic size in flex, or create fix grid in flex 
for (sq=1;sq<=squaresNumber*squaresNumber;sq++) {
    const square = document.createElement("div")
    square.classList.add("square")
    grid.appendChild(square)
}

// Eraser
const squares = document.querySelectorAll(".square")
const eraserBtn = document.querySelector(".eraser")

eraserBtn.addEventListener("click", () => {
    if (eraserBtn.classList.contains("btn-on")) {
        eraserBtn.classList.remove("btn-on")
        return
    }
    eraserBtn.classList.add("btn-on")
})
// Clear
const clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click",()=>{
    squares.forEach((square) => {
        if (square.style.cssText) {
            square.removeAttribute("style")
        }
    })
})

// Hold to draw
let squareColor = "black"
function holdToDraw(event) {
    if (event.buttons == 1) {
        event.preventDefault()
        // Return nothing if not inside of the box
        if (event["target"].className !== "square" ) {
            return
        // Clear the grid
        } else if (eraserBtn.classList.contains("btn-on")) {
            if (event["target"].style.cssText) event.target.removeAttribute("style")
        // Draw  the grid
        } else if (!event["target"].style.cssText) {
            event["target"].style.backgroundColor = squareColor
        }
    }
}
function clickToDraw(event) {
    if (event["target"].className !== "square" || event["target"].style.cssText) return
    event["target"].style.backgroundColor = squareColor
}
grid.addEventListener('mousemove', holdToDraw);
grid.addEventListener('click', clickToDraw);