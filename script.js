const grid = document.querySelector(".grid")
let grid_size = 16
let mode = "regular"

// Input event Handling
const size_inp = document.querySelector("#grid-size")
size_inp.addEventListener("keydown", (e) =>{
    if(e.key != "Enter") return

    if((size_inp.value > 100 || size_inp.value == '' || isNaN(size_inp.value))){  
        // checks if the entered value is not a number or empty or more than 100
        alert("The size is too large")
        size_inp.value = ''
        return
    }
    else{
        grid_size = size_inp.value
        removeGrid()
    }
})

// Clear button event handling
const clear_btn = document.querySelector(".clear")
clear_btn.addEventListener("click", removeGrid)

const mode_btns = document.querySelectorAll(".mode")
mode_btns.forEach((btn) => {
    btn.addEventListener("click" , function() {
        value = this.value
        toggleMode(btn)
        if(value == "regular") enableModeBtn(1)
        else if(value == "rainbow") enableModeBtn(2)
        else if(value == "eraser") enableModeBtn(0)
    })
})

function createGrid() {
    for(let i = 0; i < grid_size**2; i++){
        const grid_element = document.createElement("div")
        grid_element.classList.add("grid-element")
        grid_element.style.width = `${600 / grid_size}px`
        grid_element.style.height = `${600 / grid_size}px`
    
        grid.appendChild(grid_element)
    }

    const squares = document.querySelectorAll(".grid-element")
    squares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            if(mode == "regular"){
                square.style.backgroundColor = "black"
            }
            else if(mode == "rainbow"){
                square.style.backgroundColor = `${randomColor()}`
            }
            else if(mode == "eraser"){
                square.style.backgroundColor = "rgb(189, 189, 189)"
            }
        })
    })
}

function removeGrid() {
    // Inefficient
    /*
    const squares = document.querySelectorAll(".grid-element")
    squares.forEach((square) => {
        grid.removeChild(square)
    })
    */

    grid.innerHTML = "" // efficient
    createGrid()
}

function enableModeBtn(btn_number){
    mode_btns.forEach((btn) => {
        btn.style.backgroundColor = "white"
        btn.style.color = "black"
    })
    mode_btns[btn_number].style.backgroundColor = "black"
    mode_btns[btn_number].style.color = "white"
}

function randomColor(){
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)

    return `rgb(${r}, ${g}, ${b})`
}

function toggleMode(btn){
    value = btn.value
    if(value == "regular") mode = "regular"
    if(value == "rainbow") mode = "rainbow"
    if(value == "eraser") mode = "eraser"
}

window.onload = () => {
    createGrid()
    enableModeBtn(1)
};
