// -- STRIP TRANSITION ------------------------------------------------------------------------------------------------
function VTransition(strip) // orchestrates strip transition
{
  console.log("fuck");

  if (!SLIDE_INPRO && strip != CURRENT_STRIP)
  {
    SLIDE_INPRO = true;

    timeForZoom = ZOOM_TIME - ZT_OVERLAP;
    timeForSlide = timeForZoom + (V_TIME - ZT_OVERLAP);
    timeForFinish = timeForSlide + ZOOM_TIME;

    ToggleZoomOnStrip(CURRENT_STRIP);

    setTimeout(() => {VSlide(strip);}, timeForZoom);

    setTimeout(() => {ToggleZoomOnStrip(strip);}, timeForSlide);

    setTimeout(() => {
      CURRENT_STRIP = strip;
      SLIDE_INPRO = false;
    }, timeForFinish);
  }
}

function VSlide(strip)      // slides strips vertically
{
  var currentPosition = -CURRENT_STRIP * V_SPACE;
  var targetPosition = -strip * V_SPACE;
  var timeTotal = V_TIME / 10;
  var timeAccel = VA_TIME / 10;
  
  var distance = currentPosition - targetPosition;
  var upwards = (distance < 0) ? false : true;
  distance = Math.abs(distance);

  var timeAtMax = timeTotal - (2 * timeAccel);
  var maxVelocity = distance / (timeAccel + timeAtMax);
  var acceleration = maxVelocity / timeAccel;

  maxVelocity -= acceleration * 0.5;

  var currentVelocity = 0;
  var maxVelocityTimer = 0;
  var slider = setInterval(function()
  {
    if (currentVelocity < maxVelocity && maxVelocityTimer < timeAtMax)
      currentVelocity += acceleration;
    else if (maxVelocityTimer < timeAtMax)
      maxVelocityTimer++;
    else
      currentVelocity -= acceleration;

    currentPosition += upwards ? (currentVelocity * -1) : currentVelocity;
    TREE.style.top = `${currentPosition}px`;
  }, 10);

  setTimeout(() => {
    clearInterval(slider);
    TREE.style.top = `${targetPosition}px`;
  }, V_TIME);
}

// -- PANEL TRANSITION ------------------------------------------------------------------------------------------------
function HTransition(panel) // orchestrates panel transition
{
  if (!SLIDE_INPRO && panel != CURRENT_PANEL[CURRENT_STRIP])
  {
    SLIDE_INPRO = true;

    HSlide(panel);

    setTimeout(() => {
      CURRENT_PANEL[CURRENT_STRIP] = panel;
      SLIDE_INPRO = false;
    }, H_TIME);
  }
}

function HSlide(panel)      // slides panel horizontally
{
  var currentPosition = -CURRENT_PANEL[CURRENT_STRIP] * H_SPACE;
  var targetPosition = -panel * H_SPACE;
  var timeTotal = H_TIME / 10;
  var timeAccel = HA_TIME / 10;
  
  var distance = currentPosition - targetPosition;
  var left = (distance < 0) ? false : true;
  distance = Math.abs(distance);

  var timeAtMax = timeTotal - (2 * timeAccel);
  var maxVelocity = distance / (timeAccel + timeAtMax);
  var acceleration = maxVelocity / timeAccel;

  maxVelocity -= acceleration * 0.5;

  var currentVelocity = 0;
  var maxVelocityTimer = 0;
  var slider = setInterval(function()
  {
    if (currentVelocity < maxVelocity && maxVelocityTimer < timeAtMax)
      currentVelocity += acceleration;
    else if (maxVelocityTimer < timeAtMax)
      maxVelocityTimer++;
    else
      currentVelocity -= acceleration;

    currentPosition += left ? (currentVelocity * -1) : currentVelocity;
    STRIPS[CURRENT_STRIP].style.left = `${currentPosition}px`;
  }, 10);

  setTimeout(() => {
    clearInterval(slider);
    CURRENT_PANEL[CURRENT_STRIP] = panel;
    STRIPS[CURRENT_STRIP].style.left = `${targetPosition}px`;
  }, H_TIME);
}

// -- ZOOM FUNCTION ---------------------------------------------------------------------------------------------------
function ToggleZoomOnStrip(strip) // toggles zoom on given strip
{
  var time = ZOOM_TIME / 10;

  var matrix = window.getComputedStyle(PANELS[strip][0]).transform;
  var matrixArray = matrix.replace("matrix(", "").split(",");
  var scale = parseFloat(matrixArray[0]);

  var zoomVelocity = ZOOM_OFFSET / time;
  var zoomFinal = ZOOM;

  var shadow = P_SHADOW_SPREAD - P_SHADOW_SPREAD_OFFSET;
  var shadowVelocity = P_SHADOW_SPREAD_OFFSET / time;
  var shadowFinal = P_SHADOW_SPREAD;

  if (scale == ZOOM)
  {
    zoomVelocity *= -1;
    zoomFinal -= ZOOM_OFFSET;
    shadow = P_SHADOW_SPREAD;
    shadowVelocity *= -1;
    shadowFinal = P_SHADOW_SPREAD - P_SHADOW_SPREAD_OFFSET;
  }

  var zoomer = setInterval(function()
  {
    scale += zoomVelocity;
    shadow += shadowVelocity;

    PANEL_BUTTON_ZOOM_ALIGNERS[strip].style.transform = `scale(${scale})`;

    for (var z = 0; z < PANELS[strip].length; z++)
    {
      PANELS[strip][z].style.transform = `scale(${scale})`;
      PANELS[strip][z].style.boxShadow = `0 0 ${P_SHADOW_BLUR}px ${shadow}px ${P_SHADOW_COLOR}`;
    }
  }, 10);

  setTimeout(() => {
    clearInterval(zoomer);

    PANEL_BUTTON_ZOOM_ALIGNERS[strip].style.transform = `scale(${zoomFinal})`;

    for (var z = 0; z < PANELS[strip].length; z++)
    {
      PANELS[strip][z].style.transform = `scale(${zoomFinal})`;
      PANELS[strip][z].style.boxShadow = `0 0 ${P_SHADOW_BLUR}px ${shadowFinal}px ${P_SHADOW_COLOR}`;
    }
  }, ZOOM_TIME);
}