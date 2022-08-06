////////////////////////////////////////////////////////////////////////
const ROWS = 11;
const COLS = 16;
const TILE_SIZE = 42;
const PANEL_HEIGHT = 550;
const PANEL_WIDTH = 800;
const MARGINS = 25;

var APPLE_X_POS = 3;
var APPLE_Y_POS = 10;

var SNAKE_X_POS = 7;
var SNAKE_Y_POS = 2;

const TILE_CONTAINER = document.getElementById("tileContainer");
const RUN_BUTTON = document.getElementById("runButton");
const TILES = GenerateGridTiles();
const SNAKE = GenerateSnake();
const APPLE = GenerateApple();

let tileBrush = "";
let isDrawing = false;

ArrangeGrid();

RUN_BUTTON.onclick = function () {
  dijkstra(TILES, 0)
}

SNAKE.addEventListener("dragstart", () => {
  SNAKE.classList.add("dragging");
})

SNAKE.addEventListener("dragend", () => {
  var element = SNAKE.parentElement.childNodes[0]
  if (element.classList == "wall")
  element.remove();  
  SNAKE.classList.remove("dragging");
})

APPLE.addEventListener("dragstart", () => {
  APPLE.classList.add("dragging");
})

APPLE.addEventListener("dragend", () => {
  var element = APPLE.parentElement.childNodes[0]
  if (element.classList == "wall")
  element.remove();  
  APPLE.classList.remove("dragging");
})

TILES.forEach(tileRow => {
  tileRow.forEach (tile => {
    tile.addEventListener("dragover", e => {
      e.preventDefault();

      var tileState = InspectTile(tile);
      if (tileState != "snake")
      {
        const draggable = document.querySelector(".dragging");
        tile.appendChild(draggable);
      }
    })
  })
})

TILES.forEach(tileRow => {
  tileRow.forEach (tile => {
    tile.addEventListener("mousedown", e => {

      var tileState = InspectTile(tile);

      if (tileState == "")
      {
        tileBrush = "addwall"
        AddWall(tile)
        return;
      }

      if (tileState == "wall")
      {
        tileBrush = "removewall"
        RemoveWall(tile)
        return;
      }
    })
  })
})

TILES.forEach(tileRow => {
  tileRow.forEach (tile => {
    tile.addEventListener("mousemove", e => {
      e.preventDefault();

      var tileState = InspectTile(tile);
      if (tileBrush == "addwall" && tileState == "")
      {
        AddWall(tile);
        return;
      }

      if (tileBrush == "removewall" && tileState == "wall")
      {
        RemoveWall(tile);
        return;
      }
    })
  })
})

window.addEventListener("mouseup", e => {
  isDrawing = false;
  tileBrush = "";
  })

////////////////////////////////////////////////////////////////////////
function AddWall(tile)
{
  var wall = document.createElement("div");
  wall.style.background = "red";
  wall.style.width = "calc(100% - 10px)";
  wall.style.height = "calc(100% - 10px";
  wall.style.flexShrink = 0;
  wall.style.userSelect = "none";
  wall.style.margin = "5px";
  wall.style.order = "2";

  wall.classList.add("wall");
  tile.appendChild(wall);
}

function RemoveWall(tile)
{
  tile.childNodes[0].remove();
}

function InspectTile(tile)
{
  var element = tile.childNodes[0];
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

function GenerateGridTiles()
{
  var tiles = [], buffer;

  for (var z = 0; z < ROWS; z++)
  {
    buffer = [];

    for (var x = 0; x < COLS; x++)
    {
      var tile = document.createElement("div");
      tile.style.position      = "absolute";
      tile.style.height        = `${TILE_SIZE}px`;
      tile.style.width         = `${TILE_SIZE}px`;
      tile.style.background    = "black";
      tile.style.borderRadius  = "10%";
      tile.style.cursor        = "pointer";
      tile.style.display       = "flex";
      tile.style.userSelect    = "none";

      tile.style.flexDirection = "column";
      tile.style.flexWrap = "wrap";
      tile.style.overflow = "hidden";

      TILE_CONTAINER.insertBefore(tile, TILE_CONTAINER.firstChild);
      buffer.push(tile);
    }

    tiles.push(buffer);
  }

  return tiles;
}

function ArrangeGrid()
{
  var tileHeights = TILE_SIZE * ROWS;
  var marginHeights = PANEL_HEIGHT - (tileHeights + MARGINS * 2);
  var marginHeight = marginHeights / (ROWS + 1);

  var tileWidths = TILE_SIZE * COLS;
  var marginWidths = PANEL_WIDTH - (tileWidths + MARGINS * 2);
  var marginWidth = marginWidths / (COLS + 1);

  newTopPosition = marginHeight + MARGINS;
  for (var z = 0; z < TILES.length; z++)
  {
    newLeftPosition = marginWidth + MARGINS;

    for (var x = 0; x < TILES[z].length; x++)
    {
      TILES[z][x].style.top = `${newTopPosition}px`;
      TILES[z][x].style.left = `${newLeftPosition}px`;
      newLeftPosition += marginWidth + TILE_SIZE;
    }

    newTopPosition += marginHeight + TILE_SIZE;
  }

}

function GenerateSnake()
{
  var snake = document.createElement("div");
  snake.style.backgroundImage = "url(./icons/snek.png)";
  snake.style.backgroundRepeat    = "no-repeat";
  snake.style.backgroundSize  = "contain";
  snake.style.width = "calc(100% - 10px)";
  snake.style.height = "calc(100% - 10px)";
  snake.style.flexShrink = 0;
  snake.style.userSelect = "none";
  snake.setAttribute('draggable', true);
  snake.style.margin = "5px";

  snake.classList.add("snake");
  TILES[SNAKE_X_POS][SNAKE_Y_POS].insertBefore(snake, TILES[SNAKE_X_POS][SNAKE_Y_POS].firstChild);

  return snake;
}

function GenerateApple()
{
  var apple = document.createElement("div");
  apple.style.backgroundImage = "url(./icons/download.jpg)";
  apple.style.backgroundRepeat    = "no-repeat";
  apple.style.backgroundSize  = "contain";
  apple.style.width = "calc(100% - 10px)";
  apple.style.height = "calc(100% - 10px)";
  apple.style.flexShrink = 0;
  apple.style.userSelect = "none";
  apple.setAttribute('draggable', true);
  apple.style.margin = "5px";

  apple.classList.add("apple");
  TILES[APPLE_X_POS][APPLE_Y_POS].insertBefore(apple, TILES[APPLE_X_POS][APPLE_Y_POS].firstChild);

  return apple;
}

let V = 9;
  
// A utility function to find the 
// vertex with minimum distance 
// value, from the set of vertices 
// not yet included in shortest 
// path tree 
function minDistance(dist,sptSet)
{
      
    // Initialize min value 
    let min = Number.MAX_VALUE;
    let min_index = -1;
      
    for(let v = 0; v < V; v++)
    {
        if (sptSet[v] == false && dist[v] <= min) 
        {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}
  
// A utility function to print 
// the constructed distance array 
function printSolution(dist)
{
    document.write("Vertex \t\t Distance from Source<br>");
    for(let i = 0; i < V; i++)
    {
        document.write(i + " \t\t " + 
                 dist[i] + "<br>");
    }
}
  
// Funtion that implements Dijkstra's 
// single source shortest path algorithm 
// for a graph represented using adjacency 
// matrix representation 
function dijkstra(graph, src)
{
    let dist = new Array(V);
    let sptSet = new Array(V);
      
    // Initialize all distances as 
    // INFINITE and stpSet[] as false 
    for(let i = 0; i < V; i++)
    {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
      
    // Distance of source vertex 
    // from itself is always 0 
    dist[src] = 0;
      
    // Find shortest path for all vertices 
    for(let count = 0; count < V - 1; count++)
    {
          
        // Pick the minimum distance vertex 
        // from the set of vertices not yet 
        // processed. u is always equal to 
        // src in first iteration. 
        let u = minDistance(dist, sptSet);
          
        // Mark the picked vertex as processed 
        sptSet[u] = true;
          
        // Update dist value of the adjacent 
        // vertices of the picked vertex. 
        for(let v = 0; v < V; v++)
        {
              
            // Update dist[v] only if is not in 
            // sptSet, there is an edge from u 
            // to v, and total weight of path 
            // from src to v through u is smaller 
            // than current value of dist[v] 
            if (!sptSet[v] && graph[u][v] != 0 && 
                   dist[u] != Number.MAX_VALUE &&
                   dist[u] + graph[u][v] < dist[v])
            {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
      
    // Print the constructed distance array
    printSolution(dist);
}
















































////////////////////////////////////////////////////////////////////////
function DeleteMe () {

  setTimeout(() => {

  }, time_in_milliseconds);

  setTimeout(() => {DeleteMe()}, time_in_milliseconds);

  var interval = setInterval(function()
  {

  }, time_in_milliseconds);

  clearInterval(interval);

  onload = function()
  {

  }

  var element = document.createElement("div");
  elementArray[0].insertBefore(element, parentObject.firstChild);

  element.style.top = `${value}px`;


  element.onclick = function() {DeleteMe();}

  element.oninput = function () {

  }

  const V_SPACE_DEFAULT = 650;
  const H_SPACE_DEFAULT = 900;
  const PB_SPACE_DEFAULT = 35;

  const ZOOM_DEFAULT = 1;
  const ZOOM_OFFSET_DEFAULT = 0.15;
  const ZOOM_TIME_DEFAULT = 200;

  const V_TIME_DEFAULT = 500;
  const VA_TIME_DEFAULT = 240;
  const HA_TIME_DEFAULT = 140;
  const ZT_OVERLAP_DEFAULT = 100;

  const P_SHADOW_SPREAD_DEFAULT = 10;
  const P_SHADOW_SPREAD_OFFSET_DEFAULT = 10;
  const P_SHADOW_BLUR_DEFAULT = 15;
  const P_SHADOW_COLOR_DEFAULT = "rgba(0, 0, 0, 0.25)";

  const TREE = document.getElementById("stripTree");
  const STRIPS = document.getElementsByClassName("strip");
  const PANELS = CollectPanels();
  const STRIP_BUTTONS = document.getElementsByClassName("stripButton");
  const PANEL_BUTTON_ZOOM_ALIGNERS = document.getElementsByClassName("buttonZoomAligner");
  const PANEL_BUTTON_ALIGNERS = document.getElementsByClassName("buttonAligner");
  const PANEL_BUTTONS = CreatePanelButtons();
}