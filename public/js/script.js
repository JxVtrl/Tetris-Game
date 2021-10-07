document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'blue'
  ]

    // Formas
    const forma1 = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    const forma2 = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    const forma3 = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    const forma4 = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    const forma5 = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]
    

    const formas = [forma1, forma2, forma3, forma4, forma5]

    // Inicialização do jogo
    let posicao = 4
    let rotacao = 0

    console.log(formas[0][0])

    //Escolhe uma forma e a posição
    let random = Math.floor(Math.random()*formas.length)
    let current = formas[random][rotacao]

    // Desenha a forma no grid
    function draw() {
        current.forEach(index => {
            squares[posicao + index].classList.add('forma')
            squares[posicao + index].style.backgroundColor = colors[random]
        })
    }

    // Remove a forma do grid
    function undraw() {
        current.forEach(index => {
            squares[posicao + index].classList.remove('forma')
            squares[posicao + index].style.backgroundColor = ''
        })
    }

    // Teclas de controle
    function control(e) {
        if (e.keyCode === 37) { // esquerda
            moveLeft()
        } else if (e.keyCode === 38) { // cima
            rotate()
        } else if (e.keyCode === 39) { // direita
            moveRight()
        } else if (e.keyCode === 40) { // baixo
            moveDown()
        }
    }
    document.addEventListener('keyup', control)


    // Move para baixo
    function moveDown() {
        undraw()
        posicao += width
        draw()
        freeze()
    }

    // Congela a forma
    function freeze() {
        if (current.some(index => squares[posicao + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[posicao + index].classList.add('taken'))
            //start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * formas.length)
            current = formas[random][rotacao]
            posicao = 4

            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }


    // Move para os lados
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (posicao + index) % width === 0)

        if(!isAtLeftEdge) posicao -=1
        if(current.some(index => squares[posicao + index].classList.contains('taken'))) {
            posicao +=1
        }
        draw()
    }

    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (posicao + index) % width === width - 1)
        
        if(!isAtRightEdge) posicao +=1
        if(current.some(index => squares[posicao + index].classList.contains('taken'))) {
            posicao -=1
        }
        draw()
    }

    // Verifica lados
    function isAtRight() {
        return current.some(index=> (posicao + index + 1) % width === 0)  
    }
    function isAtLeft() {
        return current.some(index=> (posicao + index) % width === 0)
    }

    // Verifica se a forma está na posição correta
    function checkRotatedPosition(P){
        P = P || posicao
        
        if ((P+1) % width < 4) {              
            if (isAtRight()){            
                posicao += 1    
                checkRotatedPosition(P) 
                }
            }
            else if (P % width > 5) {
            if (isAtLeft()){
                posicao -= 1
                checkRotatedPosition(P)
            }
        }
    }
    
    // Rotaciona a forma
    function rotate() {
        undraw()
        rotacao ++
        if(rotacao === current.length) { //if the current rotation gets to 4, make it go back to 0
            rotacao = 0
        }
        current = formas[random][rotacao]

        checkRotatedPosition()
        draw()
    }

    //Display de próxima forma
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0

    //Forma sem rotação
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //forma1
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //forma2
        [1, displayWidth, displayWidth+1, displayWidth+2], //forma3
        [0, 1, displayWidth, displayWidth+1], //forma4
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //forma5
    ]


    // Desenha a próxima forma no display
    function displayShape() {
        //remove any trace of a forma form the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('forma')
            square.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('forma')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }

    //Start and stop button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            startBtn.innerHTML = 'Start'
            clearInterval(timerId)
            timerId = null
        } else {
            startBtn.innerHTML = 'Stop'
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*formas.length)
            displayShape()
        }
    })

    // // Restart button
    // resetBtn.addEventListener('click', () => {
    //     startBtn.innerHTML = 'Start'
    //     scoreDisplay.innerHTML = '0'
    //     clearInterval(timerId)
    //     score = 0
    //     timerId = null
        
        

    //     //reseta o grid
    //     grid.forEach(row => row.forEach(square => {
    //         square.classList.remove('taken')
    //         square.classList.remove('forma')
    //         square.style.backgroundColor = ''
    //     }))
        


    //     //remove as formas do display
    //     displaySquares.forEach(square => {
    //         square.classList.remove('forma')
    //         square.style.backgroundColor = ''
    //     })
    // })

    //add score
    function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('forma')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

    //game over
    function gameOver() {
        if(current.some(index => squares[posicao + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
        }
    }


})