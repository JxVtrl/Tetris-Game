// refresh na pagina
setInterval(() => { location.reload() }, 3000);

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    // from cria um array com todos os elementos do grid
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#reset');
    const width = 10;


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
    const forma6 = [
        [0, 1, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2],
        [0, 1, width + 1, width * 2 + 1],
        [width, width + 1, width + 2, width * 2]
    ]

    const formas = [forma1, forma2, forma3, forma4, forma5, forma6]

    // Inicialização do jogo
    let posicao = 4
    let rotacao = 0

    //Escolhe uma forma e a posição inicial
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

    // Move para a esquerda
    function moveLeft() {
        undraw()
        let colisaoWall = current.some(index => (posicao + index) % width === 0)
        let colisaoForma = current.some(index => squares[posicao + index - 1].classList.contains('taken'))

        if (!colisaoWall) {
            posicao -=1  
        }
        
        if(colisaoForma) {
            posicao +=1
        }
        draw()
    }
    // Move para a direita
    function moveRight() {
        undraw()
        let colisaoWall = current.some(index => (posicao + index) % width === width - 1)
        let colisaoForma = current.some(index => squares[posicao + index + 1].classList.contains('taken'))

        if (!colisaoWall) {
            posicao +=1
        }
        if(colisaoForma) {
            posicao -=1
        }
        draw()
    }


})