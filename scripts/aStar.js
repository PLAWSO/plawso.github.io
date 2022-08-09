class AStar {
  constructor(deTiles, rows, cols, start, end) {
    this.rows = rows
    this.cols = cols
    this.heap = []

    this.tiles = []
    for (let x = 0; x < rows; x++) {
      let buffer = []
      for (let y = 0; y < cols; y++) {
        let newTile = new Tile(deTiles[y][x], y, x) // SWAP ???
        buffer.push(newTile)
      }
      this.tiles.push(buffer)
    }

    for (let z = 0; z < cols; z++) {
      for (let x = 0; x < rows; x++) {
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

  algorithm() {
/*
    let z = 0
    while (z < 3) {
      z++
*/
      let currentTile = this.heap[0]
      this.heap.splice(0, 1)


      if (currentTile === this.end)
        return this.pathTo(currentTile)
      
      currentTile.closed = true
      currentTile.deTile.classList.add("closed")

      let neighbors = this.neighbors(currentTile)
      console.log("NEW NEIGHBORS")

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
            let oldF = neighbor.f
            neighbor.f = neighbor.g + neighbor.h
            if (neighbor.f > oldF && visited)
              console.log("that aint right")
            neighbor.deTile.classList.add("visited")
            neighbor.deTile.innerHTML = "g:"+neighbor.g+"\nh:"+neighbor.h+"\nf:"+neighbor.f+"\nx:"+neighbor.x+"\ny:"+neighbor.y
          }

          if (!visited) {
            // this.addTileToHeap(neighbor)
            this.heap.push(neighbor)
          }
          this.heap.sort((a, b) => a.f - b.f)
          /*
          else {
            this.reorderTileInHeap(neighbor)
          }*/
          let buf = []
          this.heap.forEach(tile => {
            buf.push(tile.deTile)
          })
          console.log(buf)
        }
      })
    
    //}
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
    let path = []
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

    // Left
    if (tiles[x - 1] && tiles[x - 1][y] && !tiles[x - 1][y].deTile.classList.contains("wall")) {
      buf.push(tiles[x - 1][y])
    }
  
    // Right
    if (tiles[x + 1] && tiles[x + 1][y] && !tiles[x + 1][y].deTile.classList.contains("wall")) {
      buf.push(tiles[x + 1][y])
    }
  
    // Bottom
    if (tiles[x] && tiles[x][y + 1] && !tiles[x][y + 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x][y + 1])
    }
  
    // Top
    if (tiles[x] && tiles[x][y - 1] && !tiles[x][y - 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x][y - 1])
    }
  
    // Bottom left
    if (tiles[x - 1] && tiles[x - 1][y + 1] && !tiles[x - 1][y + 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x - 1][y + 1])
    }

    // Bottom right
    if (tiles[x + 1] && tiles[x + 1][y + 1] && !tiles[x + 1][y + 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x + 1][y + 1])
    }

    // Top left
    if (tiles[x - 1] && tiles[x - 1][y - 1] && !tiles[x - 1][y - 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x - 1][y - 1])
    }

    // Top right
    if (tiles[x + 1] && tiles[x + 1][y - 1] && !tiles[x + 1][y - 1].deTile.classList.contains("wall")) {
      buf.push(tiles[x + 1][y - 1])
    }

    return buf
  }
}