class Pathfinder {
  constructor(panel, rows, cols) {
    this.panel = panel
    this.rows = rows
    this.cols = cols
    this.finished = false

    this.grid = new Grid(this.panel, this.rows, this.cols)
    this.algo = new AStar(this.grid.deTiles, this.rows, this.cols) // check deTiles
    
    let self = this
    this.deOptions = this.createDiv("options", "", this.panel, this.grid.deTileContainer)
    
    this.dePlayPauseButton = this.createDiv("algoButton", "play", this.deOptions, null, function() {
      if (self.interval && !self.finished) {
        clearInterval(self.interval)
        self.interval = null
      }
      else if (!self.finished) {
        self.interval = setInterval(function() {
          self.path = self.algo.algoStep()
          if (self.path.length > 0)
            self.drawPath(self.path)
        }, 100)
      }
    })

    this.deStepButton = this.createDiv("algoButton", "step", this.deOptions, null, function() {
      if (!self.play && !self.finished)
        self.path = self.algo.algoStep()
      if (self.path.length > 0)
        self.drawPath(self.path)
    })


  }

  createDiv(className, text, parent, insertBefore, func) {
    let button = document.createElement("div")
    button.className = className
    button.innerHTML = text
    if (func)
      button.addEventListener("click", func)
    parent.insertBefore(button, insertBefore)
    return button
  }

  drawPath(path) {
    this.finished = true
    if (this.interval)
      clearInterval(this.interval)
    path.forEach(tile => {
      tile.deTile.classList.add("path")
    })
  }
}