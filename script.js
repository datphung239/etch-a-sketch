// Create grid and squares
const grid = document.querySelector(".grid")
const gridSize = (getComputedStyle(grid).width).replace("px","")

//  Defaul background color, pen color, square resolution
grid.style.backgroundColor = "#FFFFFF"
let squareColor = "#000000"
let squaresNumber = 40


const squareSize = (gridSize/squaresNumber)
// dynamic size in flex, or create fix grid in flex 
for (sq=1;sq<=squaresNumber*squaresNumber;sq++) {
    const square = document.createElement("div")
    square.classList.add("square")
    grid.appendChild(square)
}

// Toggle (Use for rainbow, random, lighten, shading pen, eraser)
const toggle = document.querySelector("#toggle")
const buttons = toggle.querySelectorAll("button")

toggle.addEventListener("click", (event) => {
    const toggleBtn = event.target
    if (toggleBtn.classList.contains("btn")) {
        // Remove current clicked pen if double click
        if (toggleBtn.classList.contains("btn-on")) {
            return toggleBtn.classList.remove("btn-on")
        }
        // Delete all pen with button on
        buttons.forEach((button) => {
            if (button.classList.contains("btn-on")) {
                return button.classList.remove("btn-on")
            }
        })
        // Then turn button on for current clicked pen
        toggleBtn.classList.add("btn-on")

    }
})
// Toggle random
const randomBtn = document.querySelector(".random")

function randColor() { // Function return rancom color
    const rdC1 = Math.floor(Math.random() * 256)
    const rdC2 = Math.floor(Math.random() * 256)
    const rdC3 = Math.floor(Math.random() * 256)
    return `rgb(${rdC1}, ${rdC2}, ${rdC3})`
}

// Toggle rainbow
const rainbowBtn = document.querySelector(".rainbow")
const rainbowCorArr = ["#9400D3","#4B0082","#0000FF","#00FF00","#FFFF00","#FF7F00","#FF0000",]

function rainbowColor() {
    return rainbowCorArr[Math.floor(Math.random()*rainbowCorArr.length)]
}


// Toggle eraser
const eraserBtn = document.querySelector(".eraser")

// Clear all
const squares = document.querySelectorAll(".square")
const clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click",()=>{
    squares.forEach((square) => {
        if (square.style.cssText) {
            square.removeAttribute("style")
        }
    })
})

// Hold to draw
function holdToDraw(event) {randColor
    if (event.buttons == 1) {
        event.preventDefault() // New to learn
        // Return nothing if not inside of the box
        if (event["target"].className !== "square" ) {
            return
        // Toggle rainbow color 
        } else if (rainbowBtn.classList.contains("btn-on")) {
            event["target"].style.cssText = `background:${rainbowColor()}`
        // Toggle random color 
        } else if (randomBtn.classList.contains("btn-on")) {
            event["target"].style.cssText = `background:${randColor()}`
        // Toggle eraser
        } else if (eraserBtn.classList.contains("btn-on")) {
            if (event["target"].style.cssText) event.target.removeAttribute("style")
        // Draw  the grid
        } else if (event["target"].style.backgroundColor!==hexToRgb(squareColor)) {
            event["target"].style.cssText = `background:${squareColor}`
        } 
    }
}
function clickToDraw(event) {
    if (event["target"].className !== "square" || event["target"].style.cssText) return
    event["target"].style.backgroundColor = squareColor
}
grid.addEventListener('mousemove', holdToDraw);
grid.addEventListener('click', clickToDraw);

// Change background & pen color

let bgColor = document.querySelector("#color-picker-bg")
let penColor = document.querySelector("#color-picker-pen")
bgColor.addEventListener("input", () => {
    grid.style.backgroundColor = bgColor.value
})
penColor.addEventListener("input", () => {
    squareColor = penColor.value
})


// Others function

function hexToRgb(hex) {
    hex = hex.replace("#", "");
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}