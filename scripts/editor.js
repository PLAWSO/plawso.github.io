class Editor {
  constructor(tree, init) {
    this.tree = tree
    this.init = init
    this.vSpaceSlider = document.getElementById("V_SPACE_SLIDER");
    this.hSpaceSlider = document.getElementById("H_SPACE_SLIDER");
    this.vTimeSlider = document.getElementById("V_TIME_SLIDER");
    this.vaTimeSlider = document.getElementById("VA_TIME_SLIDER");
    this.hTimeSlider = document.getElementById("H_TIME_SLIDER");
    this.haTimeSlider = document.getElementById("HA_TIME_SLIDER");
    this.zoomSlider = document.getElementById("ZOOM_SLIDER");
    this.zoomTimeSlider = document.getElementById("ZOOM_TIME_SLIDER");
    this.zoomOffsetSlider = document.getElementById("ZOOM_OFFSET_SLIDER");
    
    this.resetButton = document.getElementById("resetButton");
    
    this.vSpaceDisplay = document.getElementById("V_SPACE_DISPLAY");
    this.hSpaceDisplay = document.getElementById("H_SPACE_DISPLAY");
    this.vTimeDisplay = document.getElementById("V_TIME_DISPLAY");
    this.vaTimeDisplay = document.getElementById("VA_TIME_DISPLAY");
    this.hTimeDisplay = document.getElementById("H_TIME_DISPLAY");
    this.haTimeDisplay = document.getElementById("HA_TIME_DISPLAY");
    this.zoomDisplay = document.getElementById("ZOOM_DISPLAY");
    this.zoomTimeDisplay = document.getElementById("ZOOM_TIME_DISPLAY");
    this.zoomOffsetDisplay = document.getElementById("ZOOM_OFFSET_DISPLAY");
    
    this.setSliderDefaults()
    this.setSliderFunctions(this.tree, this)
    this.setResetButtonFunction(this.tree, this)
  }

  setSliderDefaults() {
    let def = new DefValues()

    this.vSpaceDisplay.innerHTML = def.vSpace
    this.hSpaceDisplay.innerHTML = def.hSpace
    this.vTimeDisplay.innerHTML = def.vTime
    this.vaTimeDisplay.innerHTML = def.vaTime
    this.hTimeDisplay.innerHTML = def.hTime
    this.haTimeDisplay.innerHTML = def.haTime
    this.zoomDisplay.innerHTML = def.zoom
    this.zoomTimeDisplay.innerHTML = def.zoomTime
    this.zoomOffsetDisplay.innerHTML = def.zoomOffset

    this.vSpaceDisplay.value = def.vSpace
    this.hSpaceDisplay.innerHTML = def.hSpace
    this.vTimeDisplay.innerHTML = def.vTime
    this.vaTimeDisplay.innerHTML = def.vaTime
    this.hTimeDisplay.innerHTML = def.hTime
    this.haTimeDisplay.innerHTML = def.haTime
    this.zoomDisplay.innerHTML = def.zoom
    this.zoomTimeDisplay.innerHTML = def.zoomTime
    this.zoomOffsetDisplay.innerHTML = def.zoomOffset


    this.vaTimeSlider.max = def.vaTimeSliderMax
    this.haTimeSlider.max = def.haTimeSliderMax
  }

  setSliderFunctions(tree, self) {
    this.vSpaceSlider.oninput = function () {
      tree.vSpace = Math.round(this.value / 10) * 10
      self.vSpaceDisplay.innerHTML = tree.vSpace
    
      for (let z = 1; z < tree.strips.length; z++)
      {
        tree.strips[z].deStrip.style.top = `${z * tree.vSpace}px`
        tree.strips[z].dePanelButtonAligner.style.top = `${z * tree.vSpace}px`
      }
    
      tree.deTree.style.top = `${-tree.currentStrip * tree.vSpace}px`
    }
    
    this.hSpaceSlider.oninput = function () {
      for (let z = 0; z < tree.strips.length; z++)
        tree.strips[z].hSpace = Math.round(this.value / 10) * 10

      self.hSpaceDisplay.innerHTML = tree.strips[0].hSpace
    
      for (let z = 0; z < tree.strips.length; z++) {
        for (let x = 0; x < tree.strips[z].dePanels.length; x++) {
          tree.strips[z].dePanels[x].style.left = `${x * tree.strips[z].hSpace}px`
          if (tree.currentStrip == z && tree.strips[z].currentPanel == x) {
            tree.strips[z].deStrip.style.left = `${-x * tree.strips[z].hSpace}px`
          }
        }
      }

      tree.strips[tree.currentStrip].deStrip.style.left = `${-tree.strips[tree.currentStrip].currentPanel * tree.hSpace}px`;
    }
    
    this.vTimeSlider.oninput = function () {
      self.vaTimeSlider.max = Math.round(this.value / 20) * 10 - 10
      tree.vaTime = Math.round(self.vaTimeSlider.value / 10) * 10 - 10
      tree.vTime = Math.round(this.value / 10) * 10
      self.vTimeDisplay.innerHTML = tree.vTime
      self.vaTimeDisplay.innerHTML = tree.vaTime
    }
    
    this.vaTimeSlider.oninput = function () {
      tree.vaTime = Math.round(this.value / 10) * 10 - 10;
      self.vaTimeDisplay.innerHTML = tree.vaTime
    }
    
    this.hTimeSlider.oninput = function () {
      self.haTimeSlider.max = Math.round(this.value / 20) * 10 - 10
      for (let z = 0; z < tree.strips.length; z++) {
        tree.strips[z].haTime = Math.round(self.haTimeSlider.value / 10) * 10 - 10
        tree.strips[z].hTime = Math.round(this.value / 10) * 10
      }
      self.hTimeDisplay.innerHTML = tree.strips[0].hTime
      self.haTimeDisplay.innerHTML = tree.strips[0].haTime
    }
    
    this.haTimeSlider.oninput = function () {
      for (let z = 0; z < tree.strips.length; z++)
        tree.strips[z].haTime = Math.round(this.value / 10) * 10 - 10
      self.haTimeDisplay.innerHTML = tree.strips[0].haTime
    }
    
    this.zoomSlider.oninput = function () {
      tree.zoom = this.value / 100;
      self.zoomDisplay.innerHTML = tree.zoom;
    
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
    
    this.zoomTimeSlider.oninput = function () {
      tree.zoomTime = Math.round(this.value / 10) * 10;
      self.zoomTimeDisplay.innerHTML = tree.zoomTime;
    }
    
    this.zoomOffsetSlider.oninput = function () {
      tree.zoomOffset = this.value / 100;
      self.zoomOffsetDisplay.innerHTML = tree.zoomOffset;
    
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
    this.resetButton.onclick = function () {
      self.setSliderDefaults()
      tree.setTreeDefaults()
      init.arrangePanels()
      for (let z = 0; z < tree.strips.length; z++)
        tree.strips[z].setStripDefaults()
    }
  }
}