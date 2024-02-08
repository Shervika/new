document.addEventListener('DOMContentLoaded', function () {
  const gameFrame = document.getElementById('game-frame')
  const sonic = document.getElementById('sonic')
  let isJumping = false
  let score = 0 // Initialize score

  document.addEventListener('keydown', function (event) {
    if (event.code === 'space' && !isJumping) {
      isJumping = true
      sonic.style.animation = 'jump 1.2s forwards'
      setTimeout(function () {
        isJumping = false
        sonic.style.animation = 'none'
      }, 500) // Adjust the jump duration as needed
    }
  })
  let record=0;



  function spawnObstacle() {
    const obstacle = document.createElement('div')
    obstacle.classList.add('obstacle', 'animation')
    obstacle.style.left = '1100px'
    gameFrame.appendChild(obstacle)
    setTimeout(function () {
      gameFrame.removeChild(obstacle)
      updateScore() // Call updateScore when obstacle is successfully avoided
    }, 5000) // Adjust obstacle duration as needed
  }

  function updateScore() {
    score+=2
    document.getElementById('score').innerText = `Score: ${score}` // Update score display
    if(score>record){
      record=score;
    }
  }

  function checkCollision() {
    const sonicRect = sonic.getBoundingClientRect()
    const obstacles = document.getElementsByClassName('obstacle')
    for (let obstacle of obstacles) {
      const obstacleRect = obstacle.getBoundingClientRect()
      if (
        sonicRect.bottom >= obstacleRect.top &&
        sonicRect.top <= obstacleRect.bottom &&
        sonicRect.right >= obstacleRect.left &&
        sonicRect.left <= obstacleRect.right
      ) {
        alert(`Game Over! Your Score: ${score} highscore: ${record}`)
        location.reload()
      }
    }
  }



  function gameLoop() {

      if (Math.random()<0.01) {
      spawnObstacle()
      
    }
    checkCollision()
    requestAnimationFrame(gameLoop)
  }

  gameLoop()
})
