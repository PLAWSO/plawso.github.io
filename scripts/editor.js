class Editor {
  constructor(tree, init) {
    this.tree = tree
    this.init = init
    this.V_SPACE_SLIDER = document.getElementById("V_SPACE_SLIDER");
    this.H_SPACE_SLIDER = document.getElementById("H_SPACE_SLIDER");
    this.V_TIME_SLIDER = document.getElementById("V_TIME_SLIDER");
    this.VA_TIME_SLIDER = document.getElementById("VA_TIME_SLIDER");
    this.H_TIME_SLIDER = document.getElementById("H_TIME_SLIDER");
    this.HA_TIME_SLIDER = document.getElementById("HA_TIME_SLIDER");
    this.ZOOM_SLIDER = document.getElementById("ZOOM_SLIDER");
    this.ZOOM_TIME_SLIDER = document.getElementById("ZOOM_TIME_SLIDER");
    this.ZOOM_OFFSET_SLIDER = document.getElementById("ZOOM_OFFSET_SLIDER");
    
    this.RESET_BUTTON = document.getElementById("resetButton");
    
    this.V_SPACE_DISPLAY = document.getElementById("V_SPACE_DISPLAY");
    this.H_SPACE_DISPLAY = document.getElementById("H_SPACE_DISPLAY");
    this.V_TIME_DISPLAY = document.getElementById("V_TIME_DISPLAY");
    this.VA_TIME_DISPLAY = document.getElementById("VA_TIME_DISPLAY");
    this.H_TIME_DISPLAY = document.getElementById("H_TIME_DISPLAY");
    this.HA_TIME_DISPLAY = document.getElementById("HA_TIME_DISPLAY");
    this.ZOOM_DISPLAY = document.getElementById("ZOOM_DISPLAY");
    this.ZOOM_TIME_DISPLAY = document.getElementById("ZOOM_TIME_DISPLAY");
    this.ZOOM_OFFSET_DISPLAY = document.getElementById("ZOOM_OFFSET_DISPLAY");
    

    this.setSliderDefaults()
    this.setSliderFunctions(this.tree, this)
    this.setResetButtonFunction(this.tree, this)
  }

  setSliderDefaults() {
    let def = new DefValues()

    this.V_SPACE_DISPLAY.innerHTML = def.V_SPACE
    this.H_SPACE_DISPLAY.innerHTML = def.H_SPACE
    this.V_TIME_DISPLAY.innerHTML = def.V_TIME
    this.VA_TIME_DISPLAY.innerHTML = def.VA_TIME
    this.H_TIME_DISPLAY.innerHTML = def.H_TIME
    this.HA_TIME_DISPLAY.innerHTML = def.HA_TIME
    this.ZOOM_DISPLAY.innerHTML = def.ZOOM
    this.ZOOM_TIME_DISPLAY.innerHTML = def.ZOOM_TIME
    this.ZOOM_OFFSET_DISPLAY.innerHTML = def.ZOOM_OFFSET

    this.VA_TIME_SLIDER.max = def.vaTimeSliderMax
    this.HA_TIME_SLIDER.max = def.haTimeSliderMax
  }


  setSliderFunctions(tree, self) {
    this.V_SPACE_SLIDER.oninput = function () {
      tree.vSpace = Math.round(this.value / 10) * 10
      self.V_SPACE_DISPLAY.innerHTML = tree.vSpace
    
      for (let z = 1; z < tree.strips.length; z++)
      {
        tree.strips[z].deStrip.style.top = `${z * tree.vSpace}px`
        tree.strips[z].dePanelButtonAligner.style.top = `${z * tree.vSpace}px`
      }
    
      tree.deTree.style.top = `${-tree.currentStrip * tree.vSpace}px`
    }
    
    this.H_SPACE_SLIDER.oninput = function () {
      for (let z = 0; z < tree.strips.length; z++)
        tree.strips[z].hSpace = Math.round(this.value / 10) * 10

      self.H_SPACE_DISPLAY.innerHTML = tree.strips[0].hSpace
    
      for (let z = 0; z < tree.strips.length; z++)
        for (let x = 0; x < tree.strips[z].dePanels.length; x++)
          tree.strips[z].dePanels[x].style.left = `${x * tree.strips[z].hSpace}px`;

      tree.strips[tree.currentStrip].deStrip.style.left = `${-tree.strips[tree.currentStrip].currentPanel * tree.hSpace}px`;
    }
    
    this.V_TIME_SLIDER.oninput = function () {
      self.VA_TIME_SLIDER.max = Math.round(this.value / 20) * 10 - 10;
      tree.vaTime = Math.round(self.VA_TIME_SLIDER.value / 10) * 10 - 10;
      tree.vTime = Math.round(this.value / 10) * 10;
      self.V_TIME_DISPLAY.innerHTML = tree.vTime;
      self.VA_TIME_DISPLAY.innerHTML = tree.vaTime;
    }
    
    this.VA_TIME_SLIDER.oninput = function () {
      tree.vaTime = Math.round(this.value / 10) * 10 - 10;
      self.VA_TIME_DISPLAY.innerHTML = tree.vaTime;
    }
    
    this.H_TIME_SLIDER.oninput = function () {
      self.HA_TIME_SLIDER.max = Math.round(this.value / 20) * 10 - 10;
      for (let z = 0; z < tree.strips.length; z++) {
        tree.strips[z].haTime = Math.round(self.HA_TIME_SLIDER.value / 10) * 10 - 10;
        tree.strips[z].hTime = Math.round(this.value / 10) * 10;
      }
      self.H_TIME_DISPLAY.innerHTML = tree.strips[0].hTime
      self.HA_TIME_DISPLAY.innerHTML = tree.strips[0].haTime
    }
    
    this.HA_TIME_SLIDER.oninput = function () {
      for (let z = 0; z < tree.strips.length; z++)
        tree.strips[z].haTime = Math.round(this.value / 10) * 10 - 10;
      self.HA_TIME_DISPLAY.innerHTML = tree.strips[0].haTime;
    }
    
    this.ZOOM_SLIDER.oninput = function () {
      tree.zoom = this.value / 100;
      ZOOM_DISPLAY.innerHTML = tree.zoom;
    
      for (let z = 0; z < tree.strips.length; z++) {
        if (z == tree.currentStrip)
          tree.strips[z].dePanelButtonAligner.style.transform = `scale(${tree.zoom})`
        else
          tree.strips[z].dePanelButtonAligner.style.transform = `scale(${tree.zoom - tree.zoomOffset})`

          for (let x = 0; x < tree.strips[z].dePanels.length; x++) {
          if (z == tree.currentStrip)
            tree.strips[z].dePanels[x].style.transform = `scale(${tree.zoom})`
          else
            tree.strips[z].dePanels[x].style.transform = `scale(${tree.zoom - tree.zoomOffset})`
        }
      }
    }
    
    this.ZOOM_TIME_SLIDER.oninput = function () {
      tree.zoomTime = Math.round(this.value / 10) * 10;
      ZOOM_TIME_DISPLAY.innerHTML = tree.zoomTime;
    }
    
    this.ZOOM_OFFSET_SLIDER.oninput = function () {
      tree.zoomOffset = this.value / 100;
      ZOOM_OFFSET_DISPLAY.innerHTML = tree.zoomOffset;
    
      for (let z = 0; z < tree.strips.length; z++) {
        if (z != tree.currentStrip)
          tree.strips[z].dePanelButtonAligner.style.transform = `scale(${tree.zoom - tree.zoomOffset})`;
    
        for (let x = 0; x < tree.strips[z].dePanels.length; x++)
        {
          if (z != tree.currentStrip)
            tree.strips[z].dePanels[x].style.transform = `scale(${tree.zoom - tree.zoomOffset})`;
        }
      }
    }
  }

  setResetButtonFunction(tree, self) {
    this.RESET_BUTTON.onclick = function () {
      self.setSliderDefaults()
      tree.setTreeDefaults()
      init.arrangePanels()
      for (let z = 0; z < tree.strips.length; z++)
        tree.strips[z].setStripDefaults()
    }
  }
}
