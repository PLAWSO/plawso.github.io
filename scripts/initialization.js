onload = function() {
  init = new Initialization()
}

class Initialization {
  constructor() {
    this.dePanelAligner = document.getElementById("panelAligner")
    this.deNavi = document.getElementById("navi")

    let rawPanels = document.getElementsByClassName("panel")
    let sortedPanels = this.sortPanels(rawPanels)
    let rawStrips = document.getElementsByClassName("strip")
    this.strips = this.createStrips(sortedPanels, rawStrips)

    this.arrangePanels()

    this.stripButtons = document.getElementsByClassName("stripButton");
    
    this.tree = new Tree(document.getElementById("stripTree"), this.strips)
    this.editor = new Editor(this.tree, this)
    this.pathfinder = new Pathfinder(this.strips[0].dePanels[0], 11, 11)

    this.createStripButtons(this.strips, this.deNavi)
    this.setStripButtonFunction(this.tree, this.stripButtons)
    this.setPanelButtonFunction(this.strips)
  }

  sortPanels(rawPanels) {
    let sortedPanels = [], buffer, panelsCounted = 0, currentStrip;
    while (panelsCounted < rawPanels.length) {
      buffer = [];
      currentStrip = rawPanels[panelsCounted].id;
  
      while (panelsCounted < rawPanels.length && rawPanels[panelsCounted].id == currentStrip) {
        buffer.push(rawPanels[panelsCounted]);
        panelsCounted++;
      }
      sortedPanels.push(buffer);
    }
    return sortedPanels;
  }
  
  createStrips(sortedPanels, rawStrips) {
    let strips = []
    for (let z = 0; z < rawStrips.length; z++) {
      let dePanelButtonAligner = document.createElement("div")
      dePanelButtonAligner.className = "panelButtonAligner"
      this.dePanelAligner.insertBefore(dePanelButtonAligner, rawStrips[z])
      
      let dePanelButtonGroup = document.createElement("div")
      dePanelButtonGroup.className = "panelButtonGroup"
      dePanelButtonAligner.insertBefore(dePanelButtonGroup, null)
      
      let dePanelButtons = this.createPanelButtons(sortedPanels[z].length, dePanelButtonGroup)
      
      let strip = new Strip(rawStrips[z], sortedPanels[z], dePanelButtonAligner, dePanelButtons)
      strips.push(strip)
    }
    return strips
  }

  createPanelButtons(numPanels, panelButtonGroup) {
    let panelButtons = []
    for (let z = 0; z < numPanels; z++)
    {
      let newButton = document.createElement("div");
      newButton.className = "panelButton"
      panelButtons.push(newButton);
      panelButtonGroup.insertBefore(panelButtons[z], null);
    }
    panelButtons = panelButtons;

    return panelButtons;
  }

  arrangePanels() {
    let defValues = new DefValues() 
  
    for (let z = 0; z < this.strips.length; z++) {
      this.strips[z].deStrip.style.top = `${z * defValues.vSpace}px`
      this.strips[z].dePanelButtonAligner.style.top = `${z * defValues.vSpace}px`
      for (let x = 0; x < this.strips[z].dePanels.length; x++)
      {
        this.strips[z].dePanels[x].style.left = `${x * defValues.hSpace}px`
        if (z == 0)
        {
          this.strips[z].dePanelButtonAligner.style.transform = `scale(${defValues.zoom})`
          this.strips[z].dePanels[x].style.transform = `scale(${defValues.zoom})`
        }
        else
        {
          this.strips[z].dePanelButtonAligner.style.transform = `scale(${defValues.zoom - defValues.zoomOffset})`
          this.strips[z].dePanels[x].style.transform = `scale(${defValues.zoom - defValues.zoomOffset})`
        }
      }
    }
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
    return stripButtons
  }

  setStripButtonFunction(tree, stripButtons) {
    for (let z = 0; z < stripButtons.length; z++)
      stripButtons[z].onclick = function() {tree.VTransition(z)}
  }

  setPanelButtonFunction(strips) {
    for (let z = 0; z < strips.length; z++)
      for (let x = 0; x < strips[z].dePanels.length; x++)
        strips[z].dePanelButtons[x].onclick = function() {strips[z].HTransition(x)}
  }

}