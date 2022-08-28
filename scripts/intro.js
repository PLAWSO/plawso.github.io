class Intro {
  constructor() {
    this.body = document.getElementsByClassName('body')[0]
    this.shield = document.createElement('div')
    this.shield.classList.add('fsShield')
    this.body.insertBefore(this.shield, null)

    this.skip = false

    this.introSequence()
    this.tree = init.tree

    let self = this
    let skipButton = document.createElement("div")
    skipButton.classList.add("stripButton", "skipButton")
    skipButton.innerHTML = "skip"
    document.getElementsByClassName('body')[0].insertBefore(skipButton, null)
    skipButton.onclick = function () {self.skipIntro()}
  }

  movePointer(pointer, points, reps) {
    let currentPoint = 0
    let interval = setInterval(function() {
      pointer.style.left = `${points[currentPoint][0]}px`
      pointer.style.top = `${points[currentPoint][1]}px`
      currentPoint++
      if (currentPoint == points.length)
        currentPoint = 0
    }, 10)
    setTimeout(() => {
      clearInterval(interval)
    }, 10 * points.length * reps)
  }


  skipIntro() {
    this.skip = true
    skipped = true
    let pander = this.tree.stripButtons[this.tree.stripButtons.length - 1]
    pander.style.opacity = "1"
    
    if (this.shield)
      this.shield.remove()
    
    let skipButton = document.getElementsByClassName("skipButton")[0]
    if (skipButton)
      skipButton.remove()

    let panderShield = document.getElementsByClassName("panderShield")[0]
    if (panderShield)
      panderShield.remove()
  }

  introSequence() {
    // horizontal transitions
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[0].HTransition(1)
      }
    }, 16000)

    // woah woah woah
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[0].hTime = 1000
        this.tree.strips[0].HTransition(0)
      }
    }, 17500)

    // reset after woah woah woah
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[0].hTime = 300
      }
    }, 18800)

    // vertical transitions
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(2)
      }
    }, 20000)
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(3)
      }
    }, 21500)
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(0)
      }
    }, 23000)

    // change it yourself
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[0].HTransition(2)
      }
    }, 24500)


    // go fast
    setTimeout(() => {
      if (!this.skip) {
        this.tree.vTime = 200
        this.tree.vaTime = 40
        this.tree.zoomTime = 100
        this.tree.VTransition(3)
      }
    }, 26000)
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(2)
      }
    }, 26500)

    // go slow
    setTimeout(() => {
      if (!this.skip) {
        this.tree.vTime = 2000
        this.tree.vaTime = 900
        this.tree.zoomTime = 800
        this.tree.strips[0].HTransition(0)
        this.tree.VTransition(0)
      }
    }, 27500)


    // reset after go slow
    setTimeout(() => {
      if (!this.skip) {
        this.tree.vTime = 500
        this.tree.vaTime = 240
        this.tree.zoomTime = 200
      }
    }, 30000)

    // zoom way out
    setTimeout(() => {
      if (!this.skip) {
        this.tree.zoomOffset = 0.5
        this.tree.strips.forEach((strip, index) => {
          strip.dePanels.forEach(panel => {
            if (index != 0)
              panel.style.transform = `scale(0.5)`
          })
        })
        this.tree.VTransition(3)
      }
    }, 32500)

    // no zoom
    setTimeout(() => {
      if (!this.skip) {
        this.tree.zoomOffset = 0
        this.tree.strips.forEach((strip, index) => {
          strip.dePanels.forEach(panel => {
            if (index != 3)
            panel.style.transform = `scale(1)`
          })
        })
        this.tree.VTransition(0)
      }
    }, 33500)
    
    // reset after zoom
    setTimeout(() => {
      if (!this.skip) {
        this.tree.zoomOffset = 0.15
        this.tree.strips.forEach((strip, index) => {
          strip.dePanels.forEach(panel => {
            if (index != 0)
            panel.style.transform = `scale(0.85)`
          })
        })
      }
    }, 35000)

    // reveal cat pics
    setTimeout(() => {
      if (!this.skip) {
        let pander = this.tree.stripButtons[this.tree.stripButtons.length - 1]
        pander.style.opacity = "1"

        let panderShield = document.getElementsByClassName('panderShield')[0]
        if (panderShield)
          panderShield.remove()
      }
    }, 45500)

    // switch to and cycle through cat pics
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(4)
      }
    }, 50000)
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[4].HTransition(1)
      }
    }, 51000)
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[4].HTransition(2)
      }
    }, 51500)    
    setTimeout(() => {
      if (!this.skip) {
        this.tree.strips[4].HTransition(3)
      }
    }, 52000)    
    
    // switch back to video
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(0)
      }
    }, 52500)    
    
    // switch to pathfinding strip
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(1)
      }
    }, 66000)    
    
    let ptrTimeOffset = 67000
    let pointer, numPoints, points
    // create pointer
    setTimeout(() => {
      if (!this.skip) {
        pointer = document.createElement('div')
        pointer.classList.add("cursor")
        this.body.insertBefore(pointer, null)
      }
    }, 0 + ptrTimeOffset)
    
    // draw circles
    setTimeout(() => {
      if (!this.skip) {
        init.pathfinder.pathReset(init.pathfinder)
        init.pathfinder.grid.deTiles.forEach(tileRow => {
          tileRow.forEach(tile => {
            tile.classList.remove('wall')
          })
        })
        this.shield.style.cursor = 'none'
        numPoints = 40
        points = this.generateCirclePoints(numPoints, 100, 200, 200)
        this.movePointer(pointer, points, 3)
      }
    }, 0 + ptrTimeOffset)
    
    // move to grid
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 80
        points = this.generateLinePoints(numPoints, 300, 200, 1050, 450)
        this.movePointer(pointer, points, 1)
      }
    }, 1700 + ptrTimeOffset)

    let tiles = init.pathfinder.grid.deTiles
    // move to draw horizontal
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 160
        points = this.generateLinePoints(numPoints, 1050, 450, 1410, 450)
        this.movePointer(pointer, points, 1)
      }
    }, 3000 + ptrTimeOffset)
    // draw horizontal
    setTimeout(() => {
      if (!this.skip) {
        let y = 5
        let x = 1
        let interval = setInterval(function() {
          tiles[y][x].classList.add("wall")
          x++
        }, 175)
        setTimeout(() => {clearInterval(interval)}, 1575)
      }
    }, 3000 + ptrTimeOffset)

    // move to draw vertical
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 130
        points = this.generateLinePoints(numPoints, 1410, 450, 1410, 220)
        this.movePointer(pointer, points, 1)
      }
    }, 4600 + ptrTimeOffset)
    // draw vertical
    setTimeout(() => {
      if (!this.skip) {
        let y = 4
        let x = 9
        let interval = setInterval(function() {
          tiles[y][x].classList.add("wall")
          y--
        }, 175)
        setTimeout(() => {clearInterval(interval)}, 875)
      }
    }, 4900 + ptrTimeOffset)

    // move to erase vertical
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 70
        points = this.generateLinePoints(numPoints, 1410, 220, 1410, 300)
        this.movePointer(pointer, points, 1)
      }
    }, 6300 + ptrTimeOffset)
    setTimeout(() => {
      if (!this.skip) {
        let y = 0
        let x = 9
        let interval = setInterval(function() {
          tiles[y][x].classList.remove("wall")
          y++
        }, 175)
        setTimeout(() => {clearInterval(interval)}, 525)
      }
    }, 6300 + ptrTimeOffset)

    // move to snake
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 30
        points = this.generateLinePoints(numPoints, 1410, 300, 1280, 480)
        this.movePointer(pointer, points, 1)
      }
    }, 7500 + ptrTimeOffset)
    setTimeout(() => {
      if (!this.skip) {
        tiles.forEach(tileRow => {
          tileRow.forEach(tile => {
            if (tile.firstChild)
            if (tile.firstChild.classList.contains("snake"))
            tile.firstChild.remove()
          })
        })
      }
    }, 8200 + ptrTimeOffset)    
    
    // move to relocate snake
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 40
        points = this.generateLinePoints(numPoints, 1280, 480, 1460, 660)
        this.movePointer(pointer, points, 1)
      }
    }, 8200 + ptrTimeOffset)
    setTimeout(() => {
      if (!this.skip) {
        init.pathfinder.grid.createEntity("./icons/snek.png", "snake", tiles[10][10])
      }
    }, 8800 + ptrTimeOffset)

    // move to start button
    setTimeout(() => {
      if (!this.skip) {
        numPoints = 40
        points = this.generateLinePoints(numPoints, 1460, 660, 825, 300)
        this.movePointer(pointer, points, 1)
      }
    }, 9000 + ptrTimeOffset)
    // press play
    setTimeout(() => {
      if (!this.skip) {
        init.pathfinder.togglePlay(init.pathfinder)
      }
    }, 9700 + ptrTimeOffset)

    // delete pointer
    setTimeout(() => {
      if (!this.skip) {
        pointer.remove()
        this.shield.style.cursor = 'not-allowed'
      }
    }, 11000 + ptrTimeOffset)
    
    // reset grid
    setTimeout(() => {
      if (!this.skip) {
        init.pathfinder.pathReset(init.pathfinder)
      }
    }, 23000 + ptrTimeOffset)

    // switch back to video
    setTimeout(() => {
      if (!this.skip) {
        this.tree.VTransition(0)
      }
    }, 87000)    
    
    setTimeout(() => {
      if (!this.skip) {
        this.shield.remove()
        document.getElementsByClassName("skipButton")[0].remove()
      }
    }, 100000)
  }

  generateCirclePoints(numPoints, radius, xOffset, yOffset) {
    let sep = (2 * Math.PI) / numPoints
    let points = []
    let cur = sep
    for (let z = 0; z < numPoints; z++) {
      let x = (Math.cos(cur) * radius) + xOffset
      let y = (Math.sin(cur) * radius) + yOffset
      points.push([x, y])
      cur += sep
    }
    return points
  }

  generateLinePoints(numPoints, startX, startY, endX, endY) {
    let xSep = (endX - startX) / numPoints
    let ySep = (endY - startY) / numPoints    
    let points = []
    let xCur = startX
    let yCur = startY
    for (let z = 0; z < numPoints; z++) {
      xCur += xSep
      yCur += ySep
      points.push([xCur, yCur])
    }
    return points
  }
}