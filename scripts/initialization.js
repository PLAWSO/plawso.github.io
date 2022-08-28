var init
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

    this.tree = new Tree(document.getElementById("stripTree"), this.strips, this.deNavi)
    this.editor = new Editor(this.tree, this)
    this.pathfinder = new Pathfinder(this.strips[1].dePanels[0], 11, 11)

    this.setPanelButtonFunction(this.strips)

    let bubbleContainer = document.getElementById("bubbleContainer")
    let bubbles = []
    for (let z = 0; z < 5; z++) {
      let deBubble = document.createElement("div")
      deBubble.className = "bubble"
      bubbleContainer.insertBefore(deBubble, null)
      let bubble = new Bubble(deBubble)
      bubbles.push(bubble)
    }

    let obviousPander = this.tree.stripButtons[this.tree.stripButtons.length - 1]
    obviousPander.style.opacity = "0"

    let panderShield = document.createElement('div')
    panderShield.classList.add('panderShield')
    document.getElementById('navi').insertBefore(panderShield, null)
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
      
      let dePanelButtons
      if (sortedPanels[z].length > 1) {
        dePanelButtons = this.createPanelButtons(sortedPanels[z].length, dePanelButtonGroup)
        dePanelButtons[0].style.backgroundColor = "#a6a6a6"
      }
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

  setPanelButtonFunction(strips) {
    for (let z = 0; z < strips.length; z++)
      for (let x = 0; x < strips[z].dePanels.length; x++)
        if (strips[z].dePanels.length > 1)
          strips[z].dePanelButtons[x].onclick = function() {strips[z].HTransition(x)}
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
}