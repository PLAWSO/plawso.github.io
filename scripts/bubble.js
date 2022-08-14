class Bubble {
  constructor() {
    this.deBubble = document.createElement("div")
    this.deBubble.className = "bubble"
    document.getElementById("bubbleContainer").insertBefore(this.deBubble, null)
    self = this
    this.interval = setInterval(function() {
      if (+self.deBubble.style.top.replace("px", "") < -700) {
        self.deBubble.style.top = "1000px"
        self.deBubble.style.left = `${Math.random() * 100}%`
      }

      self.deBubble.style.top = `${+self.deBubble.style.top.replace("px", "") - 1}px`
    }, 50)

  }
}