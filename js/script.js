const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


const backgroundImg = document.createElement('img')
backgroundImg.src = 'https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg?download=true'

const heroImg = document.createElement('img')
heroImg.src = 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/135655/nicubunu_Game_baddie_Ninja.png'

const starImg = document.createElement('img')
starImg.src = 'https://blog.knife-depot.com/wp-content/uploads/2020/03/shuriken.png'

const enemyImg = document.createElement('img')
enemyImg.src = '/img/kisspng-ninja-clip-art.png'

const audio = document.createElement('audio')
audio.src = 'http://mrclan.com/fastdl/tfc/sound/fire3.wav'

const stabAudio = document.createElement('audio')
stabAudio.src = '/sounds/Sharp Punch-SoundBible.com-1947392621.mp3.crdownload'


let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 160,
    y: 320,
    width: 150,
    height: 150
  },
  bullets: [],
  enemies: []
}


function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
        num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
        y = Math.max(rect1.y, rect2.y),                                  // not used
        num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height)  // not used
  return (num1 >= x && num2 >= y)                                        // second part not used
}


function update() {
  data.hero.x += data.hero.xDelta
  data.hero.y += data.hero.yDelta


  data.bullets.forEach(bullet => {
    data.enemies.forEach(enemy => {
      if (intersect(bullet, enemy)) {
        stabAudio.currentTime = 0
        stabAudio.play()
        bullet.deleteMe = true
        enemy.deleteMe = true
      }
    })
  })

  data.bullets = data.bullets.filter(bullet => {
    return bullet.deleteMe !== true
  })

  data.enemies = data.enemies.filter(enemy => {
    return enemy.deleteMe !== true
  })


  data.bullets.forEach(bullet => {
    bullet.x += bullet.xDelta
  })

  data.bullets = data.bullets.filter(bullet => {
    if (bullet.x > canvas.width) {
      return false
    }
    return true
  })

  data.enemies.forEach(enemy => {
    enemy.x += enemy.xDelta
  })

  if (data.enemies.length === 0) {
    data.enemies.push({
      xDelta: -4,
      x: canvas.width + 20,
      y: data.hero.y,
      width: 150,
      height: 150
    })
  }
}


function draw() {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(heroImg, data.hero.x, data.hero.y, data.hero.width, data.hero.height)

  data.bullets.forEach(bullet => {
    ctx.drawImage(starImg, bullet.x, bullet.y, bullet.width, bullet.height)
  })

  data.enemies.forEach(enemy => {
    ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height)
  })
}


function loop() {
  requestAnimationFrame(loop)
  update()
  draw()
}

loop()


document.addEventListener('keydown', e => {
  if (e.code === 'ArrowRight') {
    data.hero.xDelta = 5
  } else if (e.code === 'ArrowLeft') {
    data.hero.xDelta = -5
  } else if (e.code === 'ArrowUp') {
    data.hero.yDelta = -5
  } else if (e.code === 'ArrowDown') {
    data.hero.yDelta = 5
  } else if (e.code === 'Space') {
    audio.currentTime = 0
    audio.play()
    data.bullets.push({
      xDelta: 7,
      x: data.hero.x + 90,
      y: data.hero.y + data.hero.height / 2,
      width: 30,
      height: 30
    })
  }
})
document.addEventListener('keyup', e => {
  data.hero.xDelta = 0
  data.hero.yDelta = 0
})