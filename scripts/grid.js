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
    
    this.snakeLoc = [0, 0]
    this.appleLoc = [3, 4]
    this.deSnake = this.createEntity("./icons/snek.png", "snake", this.deTiles[this.snakeLoc[0]][this.snakeLoc[1]])
    this.deApple = this.createEntity("./icons/download.jpg", "apple", this.deTiles[this.appleLoc[0]][this.appleLoc[1]])
    
    let self = this
    window.addEventListener("mouseup", e => {
      console.log(self)
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
    entity.addEventListener("dragstart", () => {
      entity.classList.add("dragging");
    })
    
    entity.addEventListener("dragend", () => {
      let element = entity.parentElement.childNodes[0]
      if (element.classList == "wall")
        element.remove()
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
  
  addWall(tile) {
    let wall = document.createElement("div");
    wall.classList.add("wall");
    tile.appendChild(wall);
  }
  
  removeWall(tile) {
    tile.childNodes[0].remove();
  }
  
  inspectTile(tile) {
    let element = tile.childNodes[0];
    if (element == null)
      return "";
    
    element = element.classList;
    if (element == "apple")
      return "apple";
    if (element == "snake")
      return "snake";
    if (element == "wall")
      return "wall";
  }
  
  addTileControls(tiles, self) {
    tiles.forEach(tileRow => {
      tileRow.forEach (tile => {
        tile.addEventListener("mousedown", e => {
          let tileState = self.inspectTile(tile);
  
          if (tileState == "") {
            self.tileBrush = "addwall"
            self.addWall(tile)
            return;
          }
          if (tileState == "wall") {
            self.tileBrush = "removewall"
            self.removeWall(tile)
            return;
          }
        })
        
        tile.addEventListener("mousemove", e => {
          e.preventDefault();
          
          let tileState = self.inspectTile(tile);
          if (self.tileBrush == "addwall" && tileState == "") {
            self.addWall(tile);
            return;
          }
          if (self.tileBrush == "removewall" && tileState == "wall") {
            self.removeWall(tile);
            return;
          }
        })
  
        tile.addEventListener("dragover", e => {
          e.preventDefault();
        
          let tileState = self.inspectTile(tile);
          if (tileState != "snake") {
            const draggable = document.querySelector(".dragging");
            tile.appendChild(draggable);
          }
        })
      })
    })
  }
}