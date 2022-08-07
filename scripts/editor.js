/*

var V_SPACE_SLIDER = document.getElementById("V_SPACE_SLIDER");
var H_SPACE_SLIDER = document.getElementById("H_SPACE_SLIDER");
var V_TIME_SLIDER = document.getElementById("V_TIME_SLIDER");
var VA_TIME_SLIDER = document.getElementById("VA_TIME_SLIDER");
var H_TIME_SLIDER = document.getElementById("H_TIME_SLIDER");
var HA_TIME_SLIDER = document.getElementById("HA_TIME_SLIDER");
var ZOOM_SLIDER = document.getElementById("ZOOM_SLIDER");
var ZOOM_TIME_SLIDER = document.getElementById("ZOOM_TIME_SLIDER");
var ZOOM_OFFSET_SLIDER = document.getElementById("ZOOM_OFFSET_SLIDER");

var V_SPACE_DISPLAY = document.getElementById("V_SPACE_DISPLAY");
var H_SPACE_DISPLAY = document.getElementById("H_SPACE_DISPLAY");
var V_TIME_DISPLAY = document.getElementById("V_TIME_DISPLAY");
var VA_TIME_DISPLAY = document.getElementById("VA_TIME_DISPLAY");
var H_TIME_DISPLAY = document.getElementById("H_TIME_DISPLAY");
var HA_TIME_DISPLAY = document.getElementById("HA_TIME_DISPLAY");
var ZOOM_DISPLAY = document.getElementById("ZOOM_DISPLAY");
var ZOOM_TIME_DISPLAY = document.getElementById("ZOOM_TIME_DISPLAY");
var ZOOM_OFFSET_DISPLAY = document.getElementById("ZOOM_OFFSET_DISPLAY");

var RESET_BUTTON = document.getElementById("resetButton");

V_SPACE_DISPLAY.innerHTML = V_SPACE_DEFAULT;
H_SPACE_DISPLAY.innerHTML = H_SPACE_DEFAULT;
V_TIME_DISPLAY.innerHTML = V_TIME_DEFAULT;
VA_TIME_DISPLAY.innerHTML = VA_TIME_DEFAULT;
H_TIME_DISPLAY.innerHTML = H_TIME_DEFAULT;
HA_TIME_DISPLAY.innerHTML = HA_TIME_DEFAULT;
ZOOM_DISPLAY.innerHTML = ZOOM_DEFAULT;
ZOOM_TIME_DISPLAY.innerHTML = ZOOM_TIME_DEFAULT;
ZOOM_OFFSET_DISPLAY = ZOOM_OFFSET_DEFAULT;

V_SPACE_SLIDER.oninput = function () {
  V_SPACE = Math.round(this.value / 10) * 10;
  V_SPACE_DISPLAY.innerHTML = V_SPACE;

  for (var z = 1; z < STRIPS.length; z++)
  {
    STRIPS[z].style.top = `${z * V_SPACE}px`;
    PANEL_BUTTON_ZOOM_ALIGNERS[z].style.top = `${z * V_SPACE}px`;
  }

  TREE.style.top = `${-CURRENT_STRIP * V_SPACE}px`;
}

H_SPACE_SLIDER.oninput = function () {
  H_SPACE = Math.round(this.value / 10) * 10;
  H_SPACE_DISPLAY.innerHTML = H_SPACE;

  for (var z = 0; z < STRIPS.length; z++)
  {
    for (var x = 0; x < PANELS[z].length; x++)
    {
      PANELS[z][x].style.left = `${x * H_SPACE}px`;
      PANEL_BUTTON_ZOOM_ALIGNERS[z].style.top = `${z * V_SPACE}px`;
    }
  }

  STRIPS[CURRENT_STRIP].style.left = `${-CURRENT_PANEL[CURRENT_STRIP] * H_SPACE}px`;
}

V_TIME_SLIDER.oninput = function () {
  VA_TIME_SLIDER.max = Math.round(this.value / 20) * 10 - 10;
  VA_TIME = Math.round(VA_TIME_SLIDER.value / 10) * 10 - 10;
  V_TIME = Math.round(this.value / 10) * 10;
  V_TIME_DISPLAY.innerHTML = V_TIME;
  VA_TIME_DISPLAY.innerHTML = VA_TIME;
}

VA_TIME_SLIDER.oninput = function () {
  VA_TIME = Math.round(this.value / 10) * 10 - 10;
  VA_TIME_DISPLAY.innerHTML = VA_TIME;
}

H_TIME_SLIDER.oninput = function () {
  HA_TIME_SLIDER.max = Math.round(this.value / 20) * 10 - 10;
  HA_TIME = Math.round(HA_TIME_SLIDER.value / 10) * 10 - 10;
  H_TIME = Math.round(this.value / 10) * 10;
  H_TIME_DISPLAY.innerHTML = H_TIME;
  HA_TIME_DISPLAY.innerHTML = HA_TIME;
}

HA_TIME_SLIDER.oninput = function () {
  HA_TIME = Math.round(this.value / 10) * 10 - 10;
  HA_TIME_DISPLAY.innerHTML = HA_TIME;
}

ZOOM_SLIDER.oninput = function () {
  ZOOM = this.value / 100;
  ZOOM_DISPLAY.innerHTML = ZOOM;

  for (var z = 0; z < PANELS.length; z++)
  {
    if (z == CURRENT_STRIP)
    {
      PANEL_BUTTON_ZOOM_ALIGNERS[z].style.transform = `scale(${ZOOM})`;
      console.log(CURRENT_STRIP);
    }
    else
      PANEL_BUTTON_ZOOM_ALIGNERS[z].style.transform = `scale(${ZOOM - ZOOM_OFFSET})`;


    for (var x = 0; x < PANELS[z].length; x++)
    {
      if (z == CURRENT_STRIP)
        PANELS[z][x].style.transform = `scale(${ZOOM})`;
      else
        PANELS[z][x].style.transform = `scale(${ZOOM - ZOOM_OFFSET})`;
    }
  }
}

ZOOM_TIME_SLIDER.oninput = function () {
  ZOOM_TIME = Math.round(this.value / 10) * 10;
  ZOOM_TIME_DISPLAY.innerHTML = ZOOM_TIME;
}

ZOOM_OFFSET_SLIDER.oninput = function () {
  ZOOM_OFFSET = this.value / 100;
  ZOOM_OFFSET_DISPLAY.innerHTML = ZOOM_OFFSET;

  for (var z = 0; z < PANELS.length; z++)
  {
    if (z != CURRENT_STRIP)
      PANEL_BUTTON_ZOOM_ALIGNERS[z].style.transform = `scale(${ZOOM - ZOOM_OFFSET})`;

    for (var x = 0; x < PANELS[z].length; x++)
    {
      if (z != CURRENT_STRIP)
        PANELS[z][x].style.transform = `scale(${ZOOM - ZOOM_OFFSET})`;
    }
  }
}

RESET_BUTTON.onclick = function () {
  SetDefaultValues();
}

*/