class Intro {
  constructor() {
    let body = document.getElementsByClassName('body')[0]
    this.shield = document.createElement('div')
    this.shield.classList.add('fsShield')
    body.insertBefore(this.shield, null)

    this.skip = false

    this.introSequence()
    this.tree = init.tree


    var pointer = document.createElement('div')
    pointer.classList.add("cursor")
    body.insertBefore(pointer, null)
    console.log(pointer)
    let numPoints = 100
    let points = this.generateLinePoints(numPoints, 200, 200, 800, 800)
    let currentPoint = 0
    let cycles = 0
    let self = this
    console.log(points)
    let interval = setInterval(function() {
      currentPoint++
      if (currentPoint >= numPoints) {
        currentPoint = 0
        cycles++
      }
      pointer.style.left = `${points[currentPoint][0]}px`
      pointer.style.top = `${points[currentPoint][1]}px`
    }, 10)
  }

  skipIntro() {
    this.skip = true
    skipped = true
    let pander = this.tree.stripButtons[this.tree.stripButtons.length - 1]
    pander.style.opacity = "1"
    
    if (this.shield)
      this.shield.remove()

    let panderShield = document.getElementById("panderShield")
    if (panderShield)
      panderShield.remove()
    
    let skipButton = document.getElementsByClassName("skipButton")[0]
    if (skipButton)
      skipButton.remove()
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

    // uncover cat pics
    setTimeout(() => {
      if (!this.skip) {
        let pander = this.tree.stripButtons[this.tree.stripButtons.length - 1]
        pander.style.opacity = "1"
        document.getElementById("panderShield").remove()
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
    
    setTimeout(() => {

    }, 47500)    
    
    setTimeout(() => {

    }, 47500)

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

  generateCirclePoints(radius, numPoints, xOffset, yOffset) {
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