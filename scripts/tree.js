class Tree {

  constructor(tree, strips) {
    this.deTree = tree
    this.strips = strips

    let def = new DefValues()
    this.currentStrip = 0
    this.slideInpro = false
    this.zoomTime = def.ZOOM_TIME
    this.vTime = def.V_TIME
    this.vaTime = def.VA_TIME
    this.vSpace = def.V_SPACE
    this.ztOverlap = def.ZT_OVERLAP
    this.zoom = def.ZOOM
    this.zoomOffset = def.ZOOM_OFFSET
  }

  VTransition(strip) // orchestrates strip transition
  {
    if (!this.slideInpro && strip != this.currentStrip)
    {
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