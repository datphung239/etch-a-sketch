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

grid.addEventListener('mousemove', function(mousemove) {
    if(mousemove.buttons == 1) {
        mousemove.preventDefault();
        if (mousemove["target"].className !== "square" || mousemove["target"].style.cssText) return
        let square = mousemove["target"]
        square.style.backgroundColor = squareColor
    }
   });

// Eraser
const clearBtn = document.querySelector(".clear")
const eraser = document.querySelector(".eraser")

clearBtn.addEventListener("click", () => {

})
// Clear
const squares = document.querySelectorAll(".square")
clearBtn.addEventListener("click",()=>{
    squares.forEach((square) => {
        if (square.style.cssText) {
            square.removeAttribute("style")
        }
    })
})
// dynamic size in flex, or create fix grid in flex 
// bug when mouse move out of flex | bug when interact with