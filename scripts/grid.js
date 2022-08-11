class Grid {
  
  constructor(panel, rows, cols) {
    this.deHomePanel = panel
    this.rows = rows
    this.cols = cols
    this.tileBrush = ""
    this.isDrawing = false
    
    this.deTileContainer = document.createElement("div")
    this.deTileContainer.className = "tileContainer"
    this.deHomePanel.insertBefore(this.deTileContainer, null)
    this.deTiles = this.createTiles(this.deTileContainer, this.rows, this.cols)
    this.addTileControls(this.deTiles, this)
    
    this.snakeLoc = [6, 6]
    this.appleLoc = [3, 3]
    this.deSnake = this.createEntity("./icons/snek.png", "snake", this.deTiles[this.snakeLoc[0]][this.snakeLoc[1]])
    this.deApple = this.createEntity("./icons/download.jpg", "apple", this.deTiles[this.appleLoc[0]][this.appleLoc[1]])
    this.startDrag

    let self = this
    
    window.addEventListener("mouseup", e => {
      self.isDrawing = false;
      self.tileBrush = "";
    })
  }

  createEntity(iconPath, className, startTile) {
    let entity = document.createElement("div")
    entity.style.backgroundImage = "url(" + iconPath + ")"
    entity.className = "entity"
    entity.setAttribute('draggable', true)
    entity.classList.add(className)
    
    startTile.insertBefore(entity, null);
    
    this.addEntityControls(entity)
    return entity
  }
  
  addEntityControls(entity) {
    let self = this
    entity.addEventListener("dragstart", () => {
      entity.classList.add("dragging")
      self.startDrag = entity.parentElement
    })
    
    entity.addEventListener("dragend", () => {
      if (entity.parentElement.classList.contains("wall"))
        entity.parentElement.classList.remove("wall")
      entity.classList.remove("dragging")
    })
  }
  
  createTiles(tileContainer, rows, cols) {
    let tiles = [], buffer;
    for (let z = 0; z < rows; z++) {
      buffer = [];
      for (let x = 0; x < cols; x++) {
        let tile = document.createElement("div")
        tile.className = "tile"
        tileContainer.insertBefore(tile, null)
        buffer.push(tile);
      }
      tiles.push(buffer);
    }
    return tiles;
  }

  addTileControls(tiles, self) {
    tiles.forEach(tileRow => {
      tileRow.forEach (tile => {
        tile.addEventListener("mousedown", e => {
  
          if (!tile.childNodes[0]) {
            if (!tile.classList.contains("wall")) {
              self.tileBrush = "addwall"
              tile.classList.add("wall")
              return
            }
            else {
              self.tileBrush = "removewall"
              tile.classList.remove("wall")
              return
            }
          }
        })
        
        tile.addEventListener("mousemove", e => {
          e.preventDefault();
          
          let wall = tile.classList.contains("wall");
          let entity = tile.childNodes[0]
          if (self.tileBrush == "addwall" && !wall && !entity) {
            tile.classList.add("wall")
            return;
          }
          if (self.tileBrush == "removewall" && wall) {
            tile.classList.remove("wall")
            return;
          }
        })

        tile.addEventListener("dragover", e => {
          e.preventDefault();
          let draggable = document.querySelector(".dragging");
          if (!tile.childNodes[0] || tile.childNodes[0].classList === draggable.classList) {
            tile.appendChild(draggable);
          }
          else {
            self.startDrag.appendChild(draggable)
          }
        })
      })
    })
  }
}