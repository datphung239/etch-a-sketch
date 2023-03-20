// Create grid and squares
const grid = document.querySelector(".grid")
const gridSize = (getComputedStyle(grid).width).replace("px","")

let squaresNumber = 40
const squareSize = (gridSize/squaresNumber)

for (sq=1;sq<=squaresNumber*squaresNumber;sq++) {
    const square = document.createElement("div")
    square.classList.add("square")
    grid.appendChild(square)
}

// Click interaction
let squareColor = "black"

draw = (mousemove) => {
    if (!down || mousemove["target"].className !== "square") return
    let square = mousemove["target"]
    square.style.backgroundColor = squareColor
}

let down = false
grid.addEventListener("mousedown",(mousedown) => {
    let square = mousedown["target"]
    square.style.backgroundColor = squareColor
    down = true
})
grid.addEventListener("mousemove",draw)
grid.addEventListener("mouseup",() => down = false)

// Eraser


// Clear
const squares = document.querySelectorAll(".square")
const clear = document.querySelector(".clear")
clear.addEventListener("click",()=>{
    squares.forEach((square) => {
        if (square.style.cssText) {
            square.removeAttribute("style")
        }
    })
})
