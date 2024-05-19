import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, MOVEMENTS, PIECES } from './src/consts'
import './style.css'

const canvas = document.querySelector('canvas')
const scoreBox = document.getElementById('score')
const context = canvas.getContext('2d')

const board = Array(BOARD_HEIGHT).fill().map(() => new Array(BOARD_WIDTH).fill(0))
const piece = {
  position: {
    x: BOARD_WIDTH / 2 - 1,
    y: 0
  },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT
context.scale(BLOCK_SIZE, BLOCK_SIZE)
scoreBox.innerText = '0'

let dropCounter = 0
let lastTime = 0
let score = 0

function update (time = 0) {
  const deltaTime = time - lastTime

  lastTime = time
  dropCounter += deltaTime

  if (dropCounter > 1000) {
    dropCounter = 0
    piece.position.y++

    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = '#5af'
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = '#5f5'
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })
}

document.addEventListener('keydown', event => {
  if (MOVEMENTS.DOWN.includes(event.key)) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  if (MOVEMENTS.LEFT.includes(event.key)) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }
  if (MOVEMENTS.RIGHT.includes(event.key)) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }
  if (MOVEMENTS.ROTATE.includes(event.key)) {
    rotatePiece()
  }
})

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1
      }
    })
  })

  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]

  piece.position.x = BOARD_WIDTH / 2 - 2
  piece.position.y = 0

  if (checkCollision()) {
    window.alert('GAME OVER')
    board.forEach(row => row.fill(0))
  }
}

function removeRows () {
  const rowsToRemove = []

  board.forEach((row, y) => {
    if (row.every(value => value === 1)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)

    board.unshift(newRow)
    score += 100
    scoreBox.innerText = score
  })
}

function rotatePiece () {
  const rotatedPiece = []

  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = []

    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i])
    }

    rotatedPiece.push(row)
  }

  const previousShape = piece.shape
  piece.shape = rotatedPiece
  if (checkCollision()) {
    piece.shape = previousShape
  }
}

update()
