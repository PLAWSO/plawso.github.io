class AStar {
  constructor(deTiles, rows, cols, start, end) {
    this.rows = rows
    this.cols = cols
    this.deTiles = deTiles

    this.reset()
  }
  
  findEntities() {
    for (let z = 0; z < this.cols; z++) {
      for (let x = 0; x < this.rows; x++) {
        if (this.tiles[z][x].deTile.childNodes[0]) {
          if (this.tiles[z][x].deTile.childNodes[0].classList.contains("snake"))
          this.start = this.tiles[z][x]
          if (this.tiles[z][x].deTile.childNodes[0].classList.contains("apple"))
          this.end = this.tiles[z][x]
        }
      }
    }
    
    this.heap.push(this.start)
  }

  reset() {
    this.heap = []
    this.tiles = []
    for (let x = 0; x < this.rows; x++) {
      let buffer = []
      for (let y = 0; y < this.cols; y++) {
        let newTile = new Tile(this.deTiles[y][x], y, x)
        buffer.push(newTile)
      }
      this.tiles.push(buffer)
    }

    this.deTiles.forEach(tileRow => {
      tileRow.forEach(tile => {
        tile.classList.remove("neighbor", "visited", "closed", "path")
      })
    })

    this.start = null
    this.end = null
  }

  algoStep() {
    if (!this.start)
      this.findEntities()

    let currentTile
    if (this.heap.length > 0) {
      currentTile = this.heap[0]
      this.heap.splice(0, 1)
    }
    else
      return [-1]

    if (currentTile === this.end)
      return this.pathTo(currentTile)
    
    currentTile.closed = true
    currentTile.deTile.classList.add("closed")

    let neighbors = this.neighbors(currentTile)

    neighbors.forEach(neighbor => {
      if (!neighbor.closed) {

        let gScore = currentTile.g
        if (currentTile.x != neighbor.x && currentTile.y != neighbor.y)
          gScore += 14
        else
          gScore += 10

        let visited = neighbor.visited

        if (!visited || gScore < neighbor.g) {
          neighbor.visited = true
          neighbor.parent = currentTile
          neighbor.g = gScore
          neighbor.h = this.distanceTo(neighbor, this.end)
          neighbor.f = neighbor.g + neighbor.h
          neighbor.deTile.classList.add("visited")
        }

        if (!visited)
          this.heap.push(neighbor)
        this.heap.sort((a, b) => a.f - b.f)

        let buf = []
        this.heap.forEach(tile => {
          buf.push(tile.deTile)
        })
      }
    })
  
    return []
  }

  distanceTo(start, end) {
    let s = 10, d = 14
    let hor = Math.abs(start.x - end.x)
    let ver = Math.abs(start.y - end.y)
    return (s * (hor + ver)) + ((d - (2 * s)) * Math.min(hor, ver))
  }

  pathTo(tile) {
    let cur = tile
    let path = [this.start]
    while(cur.parent) {
      path.unshift(cur)
      cur = cur.parent
    }
    return path
  }

  neighbors(tile) {
    var buf = [];
    var x = tile.x;
    var y = tile.y;
    let tiles = this.tiles;

    // left
    if (tiles[x - 1] && tiles[x - 1][y] && !tiles[x - 1][y].deTile.classList.contains("wall")) {
      buf.push(tiles[x - 1][y])
    }
    // right
    if (tiles[x + 1] && tiles[x + 1][y] && !tiles[x + 1][y].deTile.classList.contains("wall")) {
      buf.push(tiles[x + 1][y])
    }
    // bottom
    if (tiles[x] && tiles[x][y + 1] && !tiles[x][y + 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x][y + 1])
    }
    // top
    if (tiles[x] && tiles[x][y - 1] && !tiles[x][y - 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x][y - 1])
    }
    // bottom left
    if (tiles[x - 1] && tiles[x - 1][y + 1] && !tiles[x - 1][y + 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x - 1][y + 1])
    }
    // bottom right
    if (tiles[x + 1] && tiles[x + 1][y + 1] && !tiles[x + 1][y + 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x + 1][y + 1])
    }
    // top left
    if (tiles[x - 1] && tiles[x - 1][y - 1] && !tiles[x - 1][y - 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x - 1][y - 1])
    }
    // top right
    if (tiles[x + 1] && tiles[x + 1][y - 1] && !tiles[x + 1][y - 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x + 1][y - 1])
    }
    return buf
  }
}