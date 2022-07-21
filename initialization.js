// -- ON LOAD ---------------------------------------------------------------------------------------------------------
onload = function()               // run startup functions
{
  SetDefaultValues();

  SetStartConditions();

  SetButtonFunctionality();

  SetPanelButtonStyle();
}

// -- HELPER FUNCTIONS ------------------------------------------------------------------------------------------------
function CollectPanels()          // collect panels from html for const PANELS
{
  var rawPanels = document.getElementsByClassName("panel");

  var sortedPanels = [], buffer, panelsCounted = 0, currentStrip;
  while (panelsCounted < rawPanels.length)
  {
    buffer = [];
    currentStrip = rawPanels[panelsCounted].id;

    while (panelsCounted < rawPanels.length && rawPanels[panelsCounted].id == currentStrip)
    {
      buffer.push(rawPanels[panelsCounted]);
      panelsCounted++;
    }

    sortedPanels.push(buffer);
  }

  return sortedPanels;
}

function SetStartConditions()     // set start conditions
{
  CURRENT_STRIP = 0;
  CURRENT_PANEL = [];
  SLIDE_INPRO = false;

  for (var z = 0; z < PANELS.length; z++) // loop through strips
  {
    PANEL_BUTTON_ZOOM_ALIGNERS[z].style.top = `${z * V_SPACE}px`;
    STRIPS[z].style.top = `${z * V_SPACE}px`; // move strips to start positions
    CURRENT_PANEL.push(0);                          // set strip z's current panel to 0

    for (var x = 0; x < PANELS[z].length; x++)  // loop through panels on strip z
    {
      PANELS[z][x].style.left = `${x * H_SPACE}px`; // move panels to start positions

      if (z == 0)
      {
        PANEL_BUTTON_ZOOM_ALIGNERS[z].style.transform = `scale(${ZOOM})`;
        PANELS[z][x].style.transform = `scale(${ZOOM})`;
        PANELS[z][x].style.boxShadow = `0 0 ${P_SHADOW_BLUR}px ${P_SHADOW_SPREAD}px ${P_SHADOW_COLOR}`;
      }
      if (z != 0)
      {
        PANEL_BUTTON_ZOOM_ALIGNERS[z].style.transform = `scale(${ZOOM - ZOOM_OFFSET})`;
        PANELS[z][x].style.transform = `scale(${ZOOM - ZOOM_OFFSET})`;  // zoom out panels after strip 1
        PANELS[z][x].style.boxShadow = `0 0 ${P_SHADOW_BLUR}px ${P_SHADOW_SPREAD - P_SHADOW_SPREAD_OFFSET}px ${P_SHADOW_COLOR}`;
      }
    }
  }
}

function SetDefaultValues()
{
  V_SPACE = V_SPACE_DEFAULT;
  H_SPACE = H_SPACE_DEFAULT;
  PB_SPACE = PB_SPACE_DEFAULT;
  ZOOM = ZOOM_DEFAULT;
  ZOOM_OFFSET = ZOOM_OFFSET_DEFAULT;
  ZOOM_TIME = ZOOM_TIME_DEFAULT;
  V_TIME = V_TIME_DEFAULT;
  VA_TIME = VA_TIME_DEFAULT;
  H_TIME = H_TIME_DEFAULT;
  HA_TIME = HA_TIME_DEFAULT;
  ZT_OVERLAP = ZT_OVERLAP_DEFAULT;
  P_SHADOW_SPREAD = P_SHADOW_BLUR_DEFAULT;
  P_SHADOW_SPREAD_OFFSET = P_SHADOW_SPREAD_DEFAULT;
  P_SHADOW_BLUR = P_SHADOW_BLUR_DEFAULT;
  P_SHADOW_COLOR = P_SHADOW_COLOR_DEFAULT;
}

function CreatePanelButtons()     // create buttons to transition between panels
{
  var panelButtons = [], buffer;

  for (let z = 0; z < PANELS.length; z++)
  {
    buffer = [];
    for (let x = 0; x < PANELS[z].length; x++)
    {
      buffer.push(SpawnPanelButton());
      PANEL_BUTTON_ALIGNERS[z].insertBefore(buffer[x], PANEL_BUTTON_ALIGNERS[z].firstChild);
    }
    panelButtons.push(buffer.reverse());
  }

  return panelButtons;
}

function SpawnPanelButton()
{
  var newButton = document.createElement("div");
  newButton.style.position      = "absolute";
  newButton.style.height        = "24px";
  newButton.style.width         = "24px";
  newButton.style.borderRadius  = "25%";
  newButton.style.cursor        = "pointer";
  newButton.style.zIndex        = "2";
  newButton.style.marginRight   = "10px";

  return newButton;
}

function SetPanelButtonStyle()
{
  var color = "linear-gradient(to right bottom,rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.6))";

  for (let z = 0; z < PANELS.length; z++)
  {
    for (let x = 0; x < PANELS[z].length; x++)
    {
      let iconName = PANELS[z][x].getAttribute("name");

      if (iconName != null)
      {
        let path = "url(./icons/" + iconName + ".png)";
        PANEL_BUTTONS[z][x].style.background = path + "," + color;
      }
      else
        PANEL_BUTTONS[z][x].style.background = color;

      PANEL_BUTTONS[z][x].style.backgroundRepeat    = "no-repeat";
      PANEL_BUTTONS[z][x].style.backgroundPosition  = "center";
      PANEL_BUTTONS[z][x].style.backgroundPosition = "50% 50%";
      PANEL_BUTTONS[z][x].style.boxShadow = `0 0 10px 3px ${P_SHADOW_COLOR}`;
      PANEL_BUTTONS[z][x].style.left = x * PB_SPACE + "px";
    }
  }
}

function SetButtonFunctionality() // add functionality for strip and panel buttons
{
  for (let z = 0; z < PANELS.length; z++)
  {
    STRIP_BUTTONS[z].onclick = function() {VTransition(z);}

    for (let x = 0; x < PANELS[z].length; x++)
      PANEL_BUTTONS[z][x].onclick = function() {HTransition(x);}
  }
}