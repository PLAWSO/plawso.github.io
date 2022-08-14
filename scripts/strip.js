class Strip {
  constructor(strip, panels, panelButtonAligner, panelButtons) {
    this.deStrip = strip
    this.dePanels = panels
    this.dePanelButtonAligner = panelButtonAligner
    this.dePanelButtons = panelButtons

    this.setStripDefaults()
    this.currentPanel = 0
    this.slideInpro = false
  }

  setStripDefaults() {
    let def = new DefValues()
    this.hTime = def.hTime
    this.haTime = def.haTime
    this.hSpace = def.hSpace
    this.deStrip.style.left = `${-this.currentPanel * def.hSpace}px`
  }

  HTransition(panel) {
    if (!this.slideInpro && panel != this.currentPanel)
    {
      this.dePanelButtons[this.currentPanel].style.backgroundColor = "white"
      this.dePanelButtons[panel].style.backgroundColor = "#a6a6a6"
      this.slideInpro = true;
  
      this.HSlide(panel);
  
      setTimeout(() => {
        this.currentPanel = panel;
        this.slideInpro = false;
      }, this.hTime);
    }
  }

  HSlide(panel) {
    let currentPosition = -this.currentPanel * this.hSpace;
    let targetPosition = -panel * this.hSpace;
    let timeTotal = this.hTime / 10;
    let timeAccel = this.haTime / 10;
    
    let distance = currentPosition - targetPosition;
    let left = (distance < 0) ? false : true;
    distance = Math.abs(distance);
  
    let timeAtMax = timeTotal - (2 * timeAccel);
    let maxVelocity = distance / (timeAccel + timeAtMax);
    let acceleration = maxVelocity / timeAccel;
  
    maxVelocity -= acceleration * 0.5;
  
    let self = this
    let currentVelocity = 0;
    let maxVelocityTimer = 0;
    let slider = setInterval(function() {
      if (currentVelocity < maxVelocity && maxVelocityTimer < timeAtMax)
        currentVelocity += acceleration;
      else if (maxVelocityTimer < timeAtMax)
        maxVelocityTimer++;
      else
        currentVelocity -= acceleration;
  
      currentPosition += left ? (currentVelocity * -1) : currentVelocity;
      self.deStrip.style.left = `${currentPosition}px`;
    }, 10);
  
    setTimeout(() => {
      clearInterval(slider);
      self.currentPanel = panel;
      self.deStrip.style.left = `${targetPosition}px`;
    }, self.hTime);
  }
}