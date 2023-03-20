const container = document.querySelector(".container")
const containerSize = (getComputedStyle(container).width).replace("px","")

const squares = document.querySelector(".square")
let squaresNumber = 20
const squareSize = (containerSize/squaresNumber)

for (sq=1;sq<=squaresNumber*squaresNumber;sq++) {
    const square = document.createElement("div")
    square.classList.add("square")
    container.appendChild(square)
    square.setAttribute("style",`width:${squareSize}px;height:${squareSize}px`) // Fix this soon for better way
}
