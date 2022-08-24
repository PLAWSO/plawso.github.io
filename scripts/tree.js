class Tree {

  constructor(tree, strips, navi) {
    this.deNavi = navi
    this.deTree = tree
    this.strips = strips

    this.stripButtons = this.createStripButtons(this.strips, this.deNavi)
    this.setStripButtonFunction(this.tree, this.stripButtons)

    this.setTreeDefaults()
    this.currentStrip = 0
    this.slideInpro = false
  }

  createStripButtons(strips, navi) {
    let stripButton, stripButtons = []
    for (let z = 0; z < strips.length; z++) {
      stripButton = document.createElement("div")
      stripButton.innerHTML = strips[z].deStrip.getAttribute("name")
      stripButton.className = "stripButton"
      stripButtons.push(stripButton)
      navi.insertBefore(stripButton, null)
    }
    stripButtons[0].style.backgroundColor = "#479c8c"
    return stripButtons
  }

  setStripButtonFunction(tree, stripButtons) {
    let self = this
    for (let z = 0; z < this.stripButtons.length; z++) {
      stripButtons[z].onclick = function() {self.VTransition(z)}

    }
  }

  setTreeDefaults() {
    let def = new DefValues() 
    this.zoomTime = def.zoomTime
    this.vTime = def.vTime
    this.vaTime = def.vaTime
    this.vSpace = def.vSpace
    this.ztOverlap = def.ztOverlap
    this.zoom = def.zoom
    this.zoomOffset = def.zoomOffset
    this.deTree.style.top = `${-this.currentStrip * def.vSpace}px`
  }

  VTransition(strip) // orchestrates strip transition
  {
    if (!this.slideInpro && strip != this.currentStrip)
    {
      this.stripButtons[this.currentStrip].style.backgroundColor = "#65dfc9"
      this.stripButtons[strip].style.backgroundColor = "#479c8c"

      this.slideInpro = true;

      let timeForZoom = this.zoomTime - this.ztOverlap;
      let timeForSlide = timeForZoom + (this.vTime - this.ztOverlap);
      let timeForFinish = timeForSlide + this.zoomTime;

      this.ToggleZoomOnStrip(this.currentStrip);

      setTimeout(() => {this.VSlide(strip);}, timeForZoom);

      setTimeout(() => {this.ToggleZoomOnStrip(strip);}, timeForSlide);

      setTimeout(() => {
        this.currentStrip = strip;
        this.slideInpro = false;
      }, timeForFinish);
    }
  }

  VSlide(strip)      // slides strips vertically
  {
    let currentPosition = -this.currentStrip * this.vSpace;
    let targetPosition = -strip * this.vSpace;
    let timeTotal = this.vTime / 10;
    let timeAccel = this.vaTime / 10;
    
    let distance = currentPosition - targetPosition;
    let upwards = (distance < 0) ? false : true;
    distance = Math.abs(distance);

    let timeAtMax = timeTotal - (2 * timeAccel);
    let maxVelocity = distance / (timeAccel + timeAtMax);
    let acceleration = maxVelocity / timeAccel;

    maxVelocity -= acceleration * 0.5;

    let currentVelocity = 0;
    let maxVelocityTimer = 0;
    let self = this
    let slider = setInterval(function()
    {
      if (currentVelocity < maxVelocity && maxVelocityTimer < timeAtMax)
        currentVelocity += acceleration;
      else if (maxVelocityTimer < timeAtMax)
        maxVelocityTimer++;
      else
        currentVelocity -= acceleration;

      currentPosition += upwards ? (currentVelocity * -1) : currentVelocity;
      self.deTree.style.top = `${currentPosition}px`;
    }, 10);

    setTimeout(() => {
      clearInterval(slider);
      self.deTree.style.top = `${targetPosition}px`;
    }, self.vTime);
  }

  ToggleZoomOnStrip(strip) // toggles zoom on given strip
  {
    let time = this.zoomTime / 10;
    let matrix = window.getComputedStyle(this.strips[strip].dePanels[0]).transform;
    let matrixArray = matrix.replace("matrix(", "").split(",");
    let scale = parseFloat(matrixArray[0]);

    let zoomVelocity = this.zoomOffset / time;
    let zoomFinal = this.zoom;
    if (scale == this.zoom)
    {
      zoomVelocity *= -1;
      zoomFinal -= this.zoomOffset;
    }

    let self = this
    var zoomer = setInterval(function()
    {
      scale += zoomVelocity;
      self.strips[strip].dePanelButtonAligner.style.transform = `scale(${scale})`;

      for (var z = 0; z < self.strips[strip].dePanels.length; z++)
        self.strips[strip].dePanels[z].style.transform = `scale(${scale})`;
    }, 10);

    setTimeout(() => {
      clearInterval(zoomer);

      self.strips[strip].dePanelButtonAligner.style.transform = `scale(${zoomFinal})`;

      for (var z = 0; z < self.strips[strip].dePanels.length; z++)
      {
        self.strips[strip].dePanels[z].style.transform = `scale(${zoomFinal})`;
      }
    }, self.zoomTime);
  }
}