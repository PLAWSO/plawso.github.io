class Tile {
  constructor(tile, row, col) {
    this.deTile = tile
    this.x = col
    this.y = row
    this.visited = false
    this.closed = false
    this.g = 0
    this.h = 0
    this.f = 0
    //this.deTile.innerHTML = "(" + this.x + "," + this.y + ")"
  }
}