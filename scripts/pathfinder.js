class Pathfinder {
  constructor(panel, rows, cols) {
    this.panel = panel
    this.rows = rows
    this.cols = cols
    this.finished = false

    this.grid = new Grid(this.panel, this.rows, this.cols)
    this.algo = new AStar(this.grid.deTiles, this.rows, this.cols) // check deTiles
    
    let self = this
    this.deOptions = this.createDiv("options", "", "", this.panel, this.grid.deTileContainer)
    
    this.dePlayPauseButton = this.createDiv("algoButton", "", "../icons/play.png", this.deOptions, null, function() {
      if (!self.shield)
        self.shield = self.createDiv("shield", "", "", self.panel, null)
      if (self.interval && !self.finished) {
        clearInterval(self.interval)
        self.interval = null
        this.style.backgroundImage = "url(../icons/play.png)"
      }
      else if (!self.finished) {
        this.style.backgroundImage = "url(../icons/pause.png)"
        self.interval = setInterval(function() {
          self.path = self.algo.algoStep()
          if (self.path.length > 0)
            self.drawPath(self.path)
        }, 100)
      }
    })

    this.deStepButton = this.createDiv("algoButton", "", "../icons/step.png",this.deOptions, null, function() {
      if (!self.shield)
        self.shield = self.createDiv("shield", "", "", self.panel, null)
      if (!self.play && !self.finished)
        self.path = self.algo.algoStep()
      if (self.path.length > 0)
        self.drawPath(self.path)
    })

    this.deResetButton = this.createDiv("algoButton", "", "../icons/reset.png", this.deOptions, null, function() {
      if (self.interval)
        clearInterval(self.interval)
      self.interval = null
      self.finished = false
      self.path = []
      self.algo.reset()
      if (self.shield)
        self.shield.remove()
      self.shield = null
      self.dePlayPauseButton.style.backgroundImage = "url(../icons/play.png)"
    })

  }

  createDiv(className, text, iconPath, parent, insertBefore, func) {
    let button = document.createElement("div")
    button.className = className
    button.innerHTML = text
    if (iconPath != "") {
      button.style.backgroundImage = `url(${iconPath})`
    }
    if (func)
      button.addEventListener("click", func)
    parent.insertBefore(button, insertBefore)
    return button
  }

  drawPath(path) {
    this.finished = true
    if (this.interval)
      clearInterval(this.interval)
    if (path[0] != -1) {
      path.forEach(tile => {
        tile.deTile.classList.add("path")
      })
    }
  }
}