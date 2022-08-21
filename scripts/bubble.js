class Bubble {
  constructor(deBubble) {
    this.deBubble = deBubble
    this.resetBubble(deBubble)
    this.speed = Math.random() / 2 + 0.5
    self = this
    let speed = this.speed
    this.interval = setInterval(function() {self.moveBubble(deBubble, self, speed)}, 10)
  }
  
  moveBubble(deBubble, self, speed) {
    if (+deBubble.style.top.replace("px", "") < -700)
      self.resetBubble(deBubble)
    deBubble.style.top = `${+deBubble.style.top.replace("px", "") - speed}px`
  }

  resetBubble(deBubble) {
    deBubble.style.left = `${(Math.random() * 120) - 10}%`
    let size = (Math.random() * 400) + 100

    deBubble.style.height = `${size}px`
    deBubble.style.width = `${size}px`
    deBubble.style.top = `${(Math.random() * 300) + 1000}px`
  }
}